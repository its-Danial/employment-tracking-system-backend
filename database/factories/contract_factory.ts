import factory from '@adonisjs/lucid/factories'
import Contract from '#models/contract'

export const ContractFactory = factory
  .define(Contract, async ({ faker }) => {
    return {}
  })
  .build()
