import { HttpContext } from '@adonisjs/core/http'
import { BaseModel, beforeCreate, belongsTo, column, scope } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tenant from '../tenant.js'

/**
 * Base model for all tenant-scoped models
 * Automatically includes tenant relationship and scoping
 */
export default class BaseTenantModel extends BaseModel {
  @column({ serializeAs: null })
  declare tenantId: Tenant['id']

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @beforeCreate()
  static async assignTenant(model: BaseTenantModel) {
    // Only set tenantId if it's not already set
    if (!model.tenantId) {
      const ctx = HttpContext.getOrFail()
      if (ctx.tenant) model.tenantId = ctx.tenant.id
    }
  }

  /**
   * Scope to filter by current tenant from HTTP context or a specific tenant
   */
  static forTenant = scope((query, tenantId?: Tenant['id']) => {
    if (tenantId) query.where('tenant_id', tenantId)
    else {
      const ctx = HttpContext.getOrFail()
      if (ctx.tenant) query.where('tenant_id', ctx.tenant.id)
    }
  })
}
