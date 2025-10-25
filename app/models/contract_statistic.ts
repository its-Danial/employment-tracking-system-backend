import { DateTime } from 'luxon'
import type { UUID } from 'node:crypto'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Contract from '#models/contract'

export default class ContractStatistic extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare contractId: Contract['id']

  @column()
  declare totalVisas: number

  @column()
  declare allocatedVisas: number

  @column()
  declare medicalFit: number

  @column()
  declare medicalUnfit: number

  @column()
  declare medicalPending: number

  @column()
  declare visaIssued: number

  @column()
  declare visaPending: number

  @column()
  declare visaRejected: number

  @column()
  declare dropboxSubmitted: number

  @column()
  declare traveled: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Contract)
  declare contract: BelongsTo<typeof Contract>
}
