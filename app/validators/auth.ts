import vine from '@vinejs/vine'
import { passwordRule } from '#validators/common'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().doesExist({ table: 'users', column: 'email' }),
    password: passwordRule,
  })
)
