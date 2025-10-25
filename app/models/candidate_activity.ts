import { DateTime } from 'luxon'
import type { UUID } from 'node:crypto'
import { HttpContext } from '@adonisjs/core/http'
import { beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseTenantModel from '#models/base/base_tenant_model'
import Candidate from '#models/candidate'
import type User from '#models/user'
import type { CandidateActivityType } from '#types/candidate/index'

export default class CandidateActivity extends BaseTenantModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare candidateId: Candidate['id']

  @column()
  declare performedBy: User['id'] // auto assigned

  @column()
  declare activityType: CandidateActivityType

  @column()
  declare description: string | null

  @column()
  declare oldValue: string | null

  @column()
  declare newValue: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignPerformedBy(candidateActivity: CandidateActivity) {
    const { auth } = HttpContext.getOrFail()
    candidateActivity.performedBy = auth.user!.id
  }

  @belongsTo(() => Candidate)
  declare candidate: BelongsTo<typeof Candidate>
}
