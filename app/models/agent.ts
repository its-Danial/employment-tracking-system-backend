import { DateTime } from 'luxon'
import type { UUID } from 'node:crypto'
import { column } from '@adonisjs/lucid/orm'
import BaseTenantModel from '#models/base/base_tenant_model'

export default class Agent extends BaseTenantModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare name: string

  @column()
  declare contactPhone: string | null

  @column()
  declare contactEmail: string | null

  @column()
  declare commissionRate: number | null

  @column()
  declare fee: number | null

  @column.date()
  declare hireDate: DateTime | null

  @column()
  declare notes: string | null

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
