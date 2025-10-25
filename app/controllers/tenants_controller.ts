import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { TenantService } from '#services/tenant_service'

@inject()
export default class TenantsController {
  constructor(protected tenantService: TenantService) {}
  /**
   * List of Tenants
   */
  async list({ response }: HttpContext) {
    const tenants = await this.tenantService.getAllTenants()
    return response.ok({ message: 'Tenants retrieved successfully', data: tenants })
  }

  async info({ response }: HttpContext) {
    const currentTenant = await this.tenantService.getCurrentTenant()
    const serializedCurrentTenant = currentTenant.serialize({
      fields: { omit: ['id', 'createdAt', 'updatedAt'] },
    })

    return response.ok({ message: 'Tenant retrieved successfully', data: serializedCurrentTenant })
  }
}
