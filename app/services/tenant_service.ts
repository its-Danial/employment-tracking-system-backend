import { HttpContext } from '@adonisjs/core/http'
import Tenant from '#models/tenant'

export class TenantService {
  async getAllTenants() {
    return Tenant.all()
  }

  async getCurrentTenant() {
    const ctx = HttpContext.getOrFail()
    return ctx.tenant
  }
}
