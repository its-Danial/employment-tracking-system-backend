import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('tenant_id').references('id').inTable('tenants').notNullable()
      // Optional foreign keys
      table.uuid('agent_id').references('id').inTable('agents').nullable()
      table.uuid('contract_visa_id').references('id').inTable('contract_visas').nullable()

      // Personal information
      table.string('name').notNullable()
      table.string('father_name').notNullable()
      table.date('date_of_birth').notNullable()
      table.string('passport_number').notNullable()
      table.string('cnic_number').notNullable()

      // Medical test results
      table.string('medical_status').notNullable().defaultTo('pending')
      table.date('medical_date').nullable()

      // E-Number
      table.string('e_number').nullable()
      table.boolean('e_number_issued').defaultTo(false)
      table.date('e_number_application_date').nullable()

      // Dropbox submission
      table.boolean('dropbox_submitted').defaultTo(false)
      table.date('dropbox_submission_date').nullable()

      // Visa status
      table.string('visa_status').notNullable().defaultTo('pending')
      table.date('visa_issued_date').nullable()

      // Flight information
      table.date('flight_date').nullable()
      table.string('flight_number').nullable()
      table.boolean('has_traveled').defaultTo(false)

      // File delivery
      table.date('file_delivered_date').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      // unique constraints
      table.unique(['tenant_id', 'passport_number'])
      table.unique(['tenant_id', 'cnic_number'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
