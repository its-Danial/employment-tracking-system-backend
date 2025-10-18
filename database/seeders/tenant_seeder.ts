import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TenantFactory } from '#database/factories/tenant_factory'

export default class extends BaseSeeder {
  async run() {
    await TenantFactory.createMany(2)
  }
}
