import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'agents'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('tenant_id').references('id').inTable('tenants').notNullable()

      table.string('name').notNullable()
      table.string('contact_phone').nullable()
      table.string('contact_email').nullable()
      table.decimal('commission_rate', 5, 4).nullable()
      table.decimal('fee', 10, 2).nullable()
      table.date('hire_date').nullable()
      table.text('notes').nullable()
      table.boolean('is_active').defaultTo(true).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
