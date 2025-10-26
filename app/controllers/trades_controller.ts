import type { UUID } from 'node:crypto'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TradeService } from '#services/trade_service'
import {
  deleteTradeValidator,
  getTradeValidator,
  updateTradeValidator,
} from '#validators/trade_validator'

@inject()
export default class TradesController {
  constructor(protected tradeService: TradeService) {}
  /**
   * List of Trades
   */
  async index({ response }: HttpContext) {
    const trades = await this.tradeService.getCurrentTenantTrades()
    return response.ok({ message: 'Trades retrieved successfully', data: trades })
  }
  /**
   * Show individual record
   */
  async show({ request, response }: HttpContext) {
    const payload = await request.validateUsing(getTradeValidator)
    const trade = await this.tradeService.getCurrentTenantTradeById(payload.params.id as UUID)
    return response.ok({ message: 'Trade retrieved successfully', data: trade })
  }
  /**
   * Handle form submission for the edit action
   */
  async update({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateTradeValidator)
    const trade = await this.tradeService.updateTrade(payload)
    return response.ok({ message: 'Trade updated successfully', data: trade })
  }
  /**
   * Delete record
   */
  async destroy({ request, response }: HttpContext) {
    const payload = await request.validateUsing(deleteTradeValidator)
    await this.tradeService.deleteTrade(payload.params.id as UUID)
    return response.noContent()
  }
}
