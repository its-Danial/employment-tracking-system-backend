import { type Infer } from '@vinejs/vine/types'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'

export class UserService {
  /**
   * Create a new user - tenantId will be automatically set from HTTP context
   */
  async createUser(payload: Infer<typeof createUserValidator>) {
    return await User.create(payload)
  }

  /**
   * Get all users (admin functionality)
   */
  async getAllUsers() {
    return User.all()
  }

  /**
   * Get all users for the current tenant
   */
  async getCurrentTenantUsers() {
    // Uses the forTenant scope to automatically filter by current tenant
    return User.query().apply((scopes) => scopes.forTenant())
  }

  /**
   * Get users for a specific tenant (admin functionality)
   */
  async getUsersForTenant(tenantId: User['tenantId']) {
    return User.query().apply((scopes) => scopes.forTenant(tenantId))
  }

  /**
   * Get a user with their tenant relationship loaded
   */
  async getUserWithTenant(userId: User['id']) {
    return User.query()
      .where('id', userId)
      .apply((scopes) => scopes.forTenant()) // Ensure it belongs to current tenant
      .preload('tenant')
      .first()
  }

  /**
   * Get a user by ID for the current tenant
   */
  async getCurrentTenantUserById(userId: User['id']) {
    return User.query()
      .where('id', userId)
      .apply((scopes) => scopes.forTenant())
      .first()
  }

  /**
   * Get a user by ID for a specific tenant (admin functionality)
   */
  async getUserForTenantById(userId: User['id'], tenantId: User['tenantId']) {
    return User.query()
      .where('id', userId)
      .apply((scopes) => scopes.forTenant(tenantId))
      .first()
  }

  /**
   * Get a user by email for the current tenant
   */
  async getCurrentTenantUserByEmail(email: User['email']) {
    return User.query()
      .where('email', email)
      .apply((scopes) => scopes.forTenant())
      .first()
  }

  /**
   * Get a user by ID for a specific tenant (admin functionality)
   */
  async getUserForTenantByEmail(email: User['email'], tenantId: User['tenantId']) {
    return User.query()
      .where('email', email)
      .apply((scopes) => scopes.forTenant(tenantId))
      .first()
  }

  /**
   * Update user details
   */
  async updateUser(payload: Infer<typeof updateUserValidator>) {
    const user = await User.findOrFail(payload.params.id)
    user.merge(payload)
    await user.save()
    return user
  }

  /**
   * Delete a user
   */
  async deleteUser(userId: User['id']) {
    const user = await User.findOrFail(userId)
    await user.delete()
    return
  }
}
