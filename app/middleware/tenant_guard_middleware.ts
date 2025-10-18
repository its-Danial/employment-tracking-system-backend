import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Tenant from '#models/tenant'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    tenant: Tenant
  }
}

export default class TenantGuardMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const subdomain = ctx.request.hostname()?.split('.')[0]

    if (!subdomain) throw new Exception('Subdomain not provided')

    ctx.tenant = await Tenant.query().where('subdomain', subdomain).firstOrFail()

    const output = await next()
    return output
  }
}
