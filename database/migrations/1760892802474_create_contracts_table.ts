import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contracts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('tenant_id').references('id').inTable('tenants').notNullable()

      table.uuid('company_id').references('id').inTable('companies').notNullable()

      table.string('contract_number').notNullable().unique()
      table.string('title').notNullable()
      table.string('status').notNullable()
      table.date('start_date').nullable()
      table.date('end_date').nullable()
      table.text('note').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      // unique constraint for tenant_id and contract_number
      table.unique(['tenant_id', 'contract_number'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
