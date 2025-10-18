import vine from '@vinejs/vine'
import { passwordRule } from '#validators/common'

const idRule = vine.string().uuid().doesExist({ table: 'users', column: 'id' })

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(2).maxLength(100),
    email: vine.string().email().isUnique({ table: 'users', column: 'email' }),
    password: passwordRule,
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    params: vine.object({ id: idRule }),
    fullName: vine.string().minLength(2).maxLength(100).optional(),
    email: vine
      .string()
      .email()
      .isUnique({
        table: 'users',
        column: 'email',
        // Note: Handle the whereNot for excluding current user
        // This might need to be done in the controller or custom validation
      })
      .optional(),
    password: passwordRule.optional(),
  })
)

export const getUserValidator = vine.compile(vine.object({ params: vine.object({ id: idRule }) }))

export const deleteUserValidator = vine.compile(
  vine.object({ params: vine.object({ id: idRule }) })
)
