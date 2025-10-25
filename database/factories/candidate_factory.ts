import factory from '@adonisjs/lucid/factories'
import Candidate from '#models/candidate'

export const CandidateFactory = factory
  .define(Candidate, async ({ faker }) => {
    return {}
  })
  .build()
