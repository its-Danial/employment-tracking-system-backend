import factory from '@adonisjs/lucid/factories'
import ContractStatistic from '#models/contract_statistic'

export const ContractStatisticFactory = factory
  .define(ContractStatistic, async ({ faker }) => {
    return {}
  })
  .build()
