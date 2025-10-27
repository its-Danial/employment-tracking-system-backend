import { Infer } from '@vinejs/vine/types'
import Trade from '#models/trade'
import {
  createTradeValidator,
  listTradesValidator,
  updateTradeValidator,
} from '#validators/trade_validator'

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
   * Returns all data if no pagination params, otherwise returns paginated result
   */
  async getCurrentTenantTrades(payload?: Infer<typeof listTradesValidator>) {
    const { page, limit, sortBy = 'createdAt', sortOrder = 'asc' } = payload || {}

    const query = Trade.query()
      .apply((scopes) => scopes.forTenant())
      .orderBy(sortBy, sortOrder)

    if (!page || !limit) return await query.exec()

    const result = await query.paginate(page, limit)
    return result.serialize()
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
