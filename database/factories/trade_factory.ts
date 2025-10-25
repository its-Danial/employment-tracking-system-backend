import factory from '@adonisjs/lucid/factories'
import Trade from '#models/trade'

export const TradeFactory = factory
  .define(Trade, async ({ faker }) => {
    return {}
  })
  .build()
