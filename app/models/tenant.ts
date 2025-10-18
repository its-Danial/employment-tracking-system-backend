import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { UUID } from 'node:crypto'

export default class Tenant extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare name: string // Company name

  @column()
  declare title: string // Display title

  @column()
  declare subdomain: string

  @column()
  declare companyWebsite: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User)
  declare users: HasMany<typeof User>
}
