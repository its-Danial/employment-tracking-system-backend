import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contract_statistics'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('tenant_id').references('id').inTable('tenants').notNullable()

      table.uuid('contract_id').references('id').inTable('contracts').notNullable()

      table.integer('total_visas').defaultTo(0)
      table.integer('allocated_visas').defaultTo(0)
      table.integer('medical_fit').defaultTo(0)
      table.integer('medical_unfit').defaultTo(0)
      table.integer('medical_pending').defaultTo(0)
      table.integer('visa_issued').defaultTo(0)
      table.integer('visa_pending').defaultTo(0)
      table.integer('visa_rejected').defaultTo(0)
      table.integer('dropbox_submitted').defaultTo(0)
      table.integer('traveled').defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
