import { DateTime } from 'luxon'
import type { UUID } from 'node:crypto'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Agent from '#models/agent'
import BaseTenantModel from '#models/base/base_tenant_model'
import ContractVisa from '#models/contract_visa'
import type { CandidateMedicalStatus, CandidateVisaStatus } from '#types/candidate/index'

export default class Candidate extends BaseTenantModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare contractVisaId: ContractVisa['id'] | null

  @column()
  declare agentId: Agent['id'] | null

  @column()
  declare name: string

  @column()
  declare fatherName: string

  @column.date()
  declare dateOfBirth: DateTime

  @column()
  declare passportNumber: string

  @column()
  declare cnicNumber: string

  // Medical test results
  @column()
  declare medicalStatus: CandidateMedicalStatus

  @column.date()
  declare medicalDate: DateTime | null

  // E-Number
  @column()
  declare eNumber: string | null

  @column()
  declare eNumberIssued: boolean

  @column.date()
  declare eNumberApplicationDate: DateTime | null

  // Dropbox submission
  @column()
  declare dropboxSubmitted: boolean

  @column.date()
  declare dropboxSubmissionDate: DateTime | null

  // Visa status
  @column()
  declare visaStatus: CandidateVisaStatus

  @column.date()
  declare visaIssuedDate: DateTime | null

  // Flight information
  @column.date()
  declare flightDate: DateTime | null

  @column()
  declare flightNumber: string | null

  @column()
  declare hasTraveled: boolean

  // File delivery
  @column.date()
  declare fileDeliveredDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ContractVisa)
  declare contractVisa: BelongsTo<typeof ContractVisa> | null

  @belongsTo(() => Agent)
  declare agent: BelongsTo<typeof Agent> | null
}
