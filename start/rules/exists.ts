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
   * If true, checks existence globally across all tenants
   * If false (default), checks existence within current tenant
   */
  global?: boolean
  /**
   * Additional where conditions to further filter the existence check
   */
  where?: Record<string, any>
}

async function doesExist(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string' && typeof value !== 'number') return

  const query = db.from(options.table).select(options.column).where(options.column, value)

  // Add additional where conditions if provided
  if (options.where) {
    Object.entries(options.where).forEach(([key, val]) => query.andWhere(key, val))
  }

  // Handle tenant scoping
  if (!options.global) {
    // Default behavior: check existence within tenant
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

  if (!result) {
    const scope = options.global ? 'globally' : 'within your organization'
    field.report(`The {{ field }} does not exist ${scope}`, 'doesExist', field)
  }
}

export const doesExistRule = vine.createRule(doesExist)

declare module '@vinejs/vine' {
  interface VineNumber {
    doesExist(options: Options): this
  }
  interface VineString {
    doesExist(options: Options): this
  }
}

VineNumber.macro('doesExist', function (this: VineNumber, options: Options) {
  return this.use(doesExistRule(options))
})

VineString.macro('doesExist', function (this: VineString, options: Options) {
  return this.use(doesExistRule(options))
})
