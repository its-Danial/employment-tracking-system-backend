import factory from '@adonisjs/lucid/factories'
import { TENANT_DEFAULT_COLOR } from '#constants/tenant/color'
import Tenant from '#models/tenant'

let tenantCounter = 0

export const TenantFactory = factory
  .define(Tenant, async ({ faker }) => {
    tenantCounter++

    return {
      name: faker.company.name(),
      subdomain: tenantCounter === 1 ? 'localhost' : faker.internet.domainName(), // Set 'localhost' for the first tenant
      companyWebsite: faker.internet.url(),
      contactEmail: faker.internet.email(),
      contactPhone: faker.phone.number(),
      address: faker.location.streetAddress(),
      isActive: true,
      color: TENANT_DEFAULT_COLOR,
      logoUrl: faker.image.url(),
      tagline: faker.company.buzzPhrase(),
      description: faker.lorem.paragraph(),
    }
  })
  .build()
