import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { UserService } from '#services/user_service'
import { loginValidator } from '#validators/auth'
import { createUserValidator } from '#validators/user'

@inject()
export default class AuthController {
  constructor(protected userService: UserService) {}

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await this.userService.createUser(payload)

    const token = await User.accessTokens.create(user)

    return response.created({
      message: 'User registered successfully',
      data: { user, token: { value: token.value!.release(), expiresAt: token.expiresAt } },
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await this.userService.getCurrentTenantUserByEmail(email)

    if (!user) return response.abort({ message: 'Invalid Email' })
    if (!(await user.verifyPassword(password))) {
      return response.abort({ message: 'Invalid Password' })
    }

    const token = await User.accessTokens.create(user)

    return response.ok({
      message: 'Login successful',
      data: { user, token: { value: token.value!.release(), expiresAt: token.expiresAt } },
    })
  }

  async logout({ response, auth }: HttpContext) {
    const user = await auth.authenticate()
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return response.ok({ message: 'Logged out successfully' })
  }

  // TODO:
  // - Logout all sessions for a User
  // - Logout all sessions for current Tenant
  // - Logout everywhere except current session
  // - Password reset
}
