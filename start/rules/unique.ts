import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import vine, { VineNumber, VineString } from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'
import type Tenant from '#models/tenant'

interface Options {
  table: string
  column: string
  tenantId?: Tenant['id']
  /**
   * If true, checks uniqueness globally across all tenants
   * If false (default), checks uniqueness within current tenant
   */
  global?: boolean
  /**
   * Exclude a specific record from the uniqueness check (useful for updates)
   */
  whereNot?: Record<string, any>
}

async function isUnique(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string' && typeof value !== 'number') return

  const query = db.from(options.table).select(options.column).where(options.column, value)

  // Add whereNot conditions if provided (useful for updates)
  if (options.whereNot) {
    Object.entries(options.whereNot).forEach(([key, val]) => query.whereNot(key, val))
  }

  // Handle tenant scoping
  if (!options.global) {
    // Default behavior: check uniqueness within tenant
    let tenantId = options.tenantId

    // If no explicit tenantId provided, get from HTTP context
    if (!tenantId) {
      try {
        const ctx = HttpContext.getOrFail()
        tenantId = ctx.tenant?.id
      } catch {
        // If no HTTP context available, fall back to global check
        // This might happen in CLI commands or background jobs
      }
    }

    if (tenantId) query.andWhere('tenant_id', tenantId)
  }
  // If options.global is true, we don't add tenant filtering

  const result = await query.first()

  if (result) {
    const scope = options.global ? 'globally' : 'within your organization'
    field.report(`This {{ field }} is already taken ${scope}`, 'isUnique', field)
  }
}

export const isUniqueRule = vine.createRule(isUnique)

declare module '@vinejs/vine' {
  interface VineString {
    isUnique(options: Options): this
  }

  interface VineNumber {
    isUnique(options: Options): this
  }
}

VineString.macro('isUnique', function (this: VineString, options: Options) {
  return this.use(isUniqueRule(options))
})

VineNumber.macro('isUnique', function (this: VineNumber, options: Options) {
  return this.use(isUniqueRule(options))
})
