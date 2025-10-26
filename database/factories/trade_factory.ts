import factory from '@adonisjs/lucid/factories'
import Tenant from '#models/tenant'
import Trade from '#models/trade'

export const TradeFactory = factory
  .define(Trade, async ({ faker }) => {
    const tenant = await Tenant.findByOrFail('subdomain', 'localhost')
    return {
      tenantId: tenant.id,
      name: faker.lorem.words(),
      description: faker.lorem.text(),
    }
  })
  .build()
