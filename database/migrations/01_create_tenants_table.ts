import { BaseSchema } from '@adonisjs/lucid/schema'
import { TENANT_DEFAULT_COLORS } from '#constants/colors'

export default class extends BaseSchema {
  protected tableName = 'tenants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('name').notNullable().unique()
      table.string('subdomain').notNullable().unique()
      table.string('company_website').nullable()
      table.string('contact_email').notNullable()
      table.string('contact_phone').nullable()
      table.string('address').nullable()
      table.boolean('is_active').defaultTo(true).notNullable()
      table.json('colors').defaultTo(JSON.stringify(TENANT_DEFAULT_COLORS)).nullable()
      table.string('logo_url').nullable()
      table.string('tagline').nullable()
      table.text('description').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
