import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('tenant_id').references('id').inTable('tenants').notNullable()

      table.string('name').notNullable().unique()
      table.string('arabic_name').nullable()
      table.string('company_website').nullable()
      table.text('contact_info').nullable()
      table.string('country').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      // unique constraint for tenant_id and name
      table.unique(['tenant_id', 'name'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
