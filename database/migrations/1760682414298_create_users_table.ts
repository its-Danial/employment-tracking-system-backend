import { BaseSchema } from '@adonisjs/lucid/schema'
import { USER_ROLES } from '#constants/user/role'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('tenant_id').references('id').inTable('tenants').notNullable()

      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('role').defaultTo(USER_ROLES.user).notNullable()
      table.boolean('is_active').defaultTo(true).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      // unique constraint for tenant_id and email
      table.unique(['tenant_id', 'email'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
