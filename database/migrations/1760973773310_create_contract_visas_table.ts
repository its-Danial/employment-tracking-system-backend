import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contract_visas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('tenant_id').references('id').inTable('tenants').notNullable()

      table.uuid('contract_id').references('id').inTable('contracts').notNullable()
      table.uuid('trade_id').references('id').inTable('trades').notNullable()

      table.string('visa_number').notNullable() // Like 1305083051, 1305170502
      table.integer('total_visas').notNullable()
      table.integer('allocated_visas').defaultTo(0).notNullable()
      table.text('note').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      // unique constraint for contract_id and visa_number
      table.unique(['contract_id', 'visa_number'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
