import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidate_activities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('tenant_id').references('id').inTable('tenants').notNullable()

      table.uuid('candidate_id').references('id').inTable('candidates').notNullable()
      table.uuid('performed_by').references('id').inTable('users').notNullable()

      table.string('activity_type').notNullable()
      table.text('description').nullable()
      table.text('old_value').nullable()
      table.text('new_value').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
