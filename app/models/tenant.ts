import { DateTime } from 'luxon'
import type { UUID } from 'node:crypto'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Agent from '#models/agent'
import Candidate from '#models/candidate'
import Company from '#models/company'
import Trade from '#models/trade'
import User from '#models/user'

export default class Tenant extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare name: string // Company name

  @column()
  declare subdomain: string

  @column()
  declare companyWebsite: string | null

  @column()
  declare contactEmail: string

  @column()
  declare contactPhone: string | null

  @column()
  declare address: string | null

  @column()
  declare isActive: boolean

  // @column()
  // declare planType: string

  // @column()
  // declare planStartDate: DateTime | null

  // @column.dateTime()
  // declare planEndDate: DateTime | null

  @column()
  declare color: string

  @column()
  declare logoUrl: string | null

  @column()
  declare tagline: string | null

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @hasMany(() => Company)
  declare companies: HasMany<typeof Company>

  @hasMany(() => Agent)
  declare agents: HasMany<typeof Agent>

  @hasMany(() => Trade)
  declare trades: HasMany<typeof Trade>

  @hasMany(() => Candidate)
  declare candidates: HasMany<typeof Candidate>
}
