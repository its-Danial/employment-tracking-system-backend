import { DateTime } from 'luxon'
import type { UUID } from 'node:crypto'
import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import BaseTenantModel from '#models/base/base_tenant_model'
import Contract from '#models/contract'

export default class Company extends BaseTenantModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare name: string

  @column()
  declare arabicName: string | null

  @column()
  declare companyWebsite: string | null

  @column()
  declare contactInfo: string | null

  @column()
  declare country: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Contract)
  declare contracts: HasMany<typeof Contract>
}
