import Tenant from '#models/tenant'
import { HttpContext } from '@adonisjs/core/http'

export class TenantService {
  async getAllTenants() {
    return Tenant.all()
  }

  async getCurrentTenant() {
    const ctx = HttpContext.getOrFail()
    return ctx.tenant
  }
}
