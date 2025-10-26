import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TradeFactory } from '#database/factories/trade_factory'

export default class extends BaseSeeder {
  async run() {
    await TradeFactory.createMany(50)
  }
}
