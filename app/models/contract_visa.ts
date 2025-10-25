import { DateTime } from 'luxon'
import type { UUID } from 'node:crypto'
import { belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseTenantModel from '#models/base/base_tenant_model'
import Contract from '#models/contract'
import Trade from '#models/trade'

export default class ContractVisa extends BaseTenantModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare contractId: Contract['id']

  @column()
  declare tradeId: Trade['id']

  @column()
  declare visaNumber: string

  @column()
  declare totalVisas: number

  @column()
  declare allocatedVisas: number

  @computed()
  get remainingVisas() {
    return this.totalVisas - this.allocatedVisas
  }

  @column()
  declare note: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Contract)
  declare contract: BelongsTo<typeof Contract>

  @belongsTo(() => Trade)
  declare trade: BelongsTo<typeof Trade>
}
