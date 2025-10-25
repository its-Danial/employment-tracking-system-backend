import { DateTime } from 'luxon'
import type { UUID } from 'node:crypto'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import BaseTenantModel from '#models/base/base_tenant_model'
import Company from '#models/company'
import ContractVisa from '#models/contract_visa'
import Trade from '#models/trade'
import { type ContractStatus } from '#types/contract/index'

export default class Contract extends BaseTenantModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare companyId: Company['id']

  @column()
  declare contractNumber: string

  @column()
  declare title: string

  @column()
  declare status: ContractStatus

  @column.date()
  declare startDate: DateTime | null

  @column.date()
  declare endDate: DateTime | null

  @column()
  declare note: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @hasMany(() => ContractVisa)
  declare visas: HasMany<typeof ContractVisa>

  @hasMany(() => Trade)
  declare trades: HasMany<typeof Trade>
}
