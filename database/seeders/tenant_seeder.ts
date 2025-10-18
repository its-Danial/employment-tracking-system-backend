import { TenantFactory } from '#database/factories/tenant_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await TenantFactory.createMany(2)
  }
}
