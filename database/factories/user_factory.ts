import factory from '@adonisjs/lucid/factories'
import Tenant from '#models/tenant'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    const tenant = await Tenant.findByOrFail('subdomain', 'localhost')

    return {
      tenantId: tenant.id,
      fullName: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: 'password',
    }
  })
  .build()
