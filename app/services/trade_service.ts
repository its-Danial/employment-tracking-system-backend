import { Infer } from '@vinejs/vine/types'
import Trade from '#models/trade'
import { createTradeValidator, updateTradeValidator } from '#validators/trade_validator'

export class TradeService {
  /**
   * Create a new trade - tenantId will be automatically set from HTTP context
   */
  async createTrade(payload: Infer<typeof createTradeValidator>) {
    return await Trade.create(payload)
  }
  /**
   * Get all trades (admin functionality)
   */
  async getAllTrades() {
    return Trade.all()
  }
  /**
   * Get all trades for the current tenant
   */
  async getCurrentTenantTrades() {
    return Trade.query().apply((scopes) => scopes.forTenant())
  }
  /**
   * Get trades for a specific tenant (admin functionality)
   */
  async getTradesForTenant(tenantId: Trade['tenantId']) {
    return Trade.query().apply((scopes) => scopes.forTenant(tenantId))
  }
  /**
   * Get a trade by ID for the current tenant
   */
  async getCurrentTenantTradeById(tradeId: Trade['id']) {
    return Trade.query()
      .where('id', tradeId)
      .apply((scopes) => scopes.forTenant())
      .first()
  }
  /**
   * Get a trade by ID for a specific tenant (admin functionality)
   */
  async getTradeForTenantById(tradeId: Trade['id'], tenantId: Trade['tenantId']) {
    return Trade.query()
      .where('id', tradeId)
      .apply((scopes) => scopes.forTenant(tenantId))
      .first()
  }
  /**
   * Update trade
   */
  async updateTrade(payload: Infer<typeof updateTradeValidator>) {
    const trade = await Trade.findOrFail(payload.params.id)
    trade.merge(payload)
    await trade.save()
    return trade
  }
  /**
   * Delete a trade
   */
  async deleteTrade(tradeId: Trade['id']) {
    const trade = await Trade.findOrFail(tradeId)
    await trade.delete()
    return
  }
}
