import factory from '@adonisjs/lucid/factories'
import ContractVisa from '#models/contract_visa'

export const ContractVisaFactory = factory
  .define(ContractVisa, async ({ faker }) => {
    return {}
  })
  .build()
