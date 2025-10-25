import { DateTime } from 'luxon'
import type { UUID } from 'node:crypto'
import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import BaseTenantModel from '#models/base/base_tenant_model'
import ContractVisa from '#models/contract_visa'

export default class Trade extends BaseTenantModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => ContractVisa)
  declare contractVisas: HasMany<typeof ContractVisa>
}
