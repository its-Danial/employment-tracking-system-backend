import factory from '@adonisjs/lucid/factories'
import Tenant from '#models/tenant'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    const tenant = await Tenant.all()

    const randomTenantIndex = Math.floor(Math.random() * tenant.length)
    return {
      tenantId: tenant[randomTenantIndex].id,
      fullName: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: 'password',
    }
  })
  .build()
