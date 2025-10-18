import { UserService } from '#services/user_service'
import { deleteUserValidator, getUserValidator, updateUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { UUID } from 'node:crypto'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  /**
   * List of Users
   */
  async index({ response }: HttpContext) {
    const users = await this.userService.getCurrentTenantUsers()
    return response.ok({ message: 'Users retrieved successfully', data: users })
  }

  /**
   * Show individual record
   */
  async show({ request, response }: HttpContext) {
    const payload = await request.validateUsing(getUserValidator)
    const user = await this.userService.getUserWithTenant(payload.params.id as UUID)
    return response.ok({ message: 'User retrieved successfully', data: user })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)
    const user = await this.userService.updateUser(payload)
    return response.ok({ message: 'User updated successfully', data: user })
  }

  /**
   * Delete record
   */
  async destroy({ request, response }: HttpContext) {
    const payload = await request.validateUsing(deleteUserValidator)
    await this.userService.deleteUser(payload.params.id as UUID)
    return response.noContent()
  }
}
