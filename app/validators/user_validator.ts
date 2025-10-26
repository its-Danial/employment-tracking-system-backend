import vine from '@vinejs/vine'
import { passwordRule } from '#validators/common_validator'

const idDoesExistRule = vine
  .string()
  .uuid({ version: [4] })
  .doesExist({ table: 'users', column: 'id' })

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(2).maxLength(100),
    email: vine.string().email().isUnique({ table: 'users', column: 'email' }),
    password: passwordRule,
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    params: vine.object({ id: idDoesExistRule }),
    fullName: vine.string().minLength(2).maxLength(100).optional(),
    email: vine
      .string()
      .email()
      .isUnique({
        table: 'users',
        column: 'email',
        // Note: Handle the whereNot for excluding current user (maybe in controller)
      })
      .optional(),
    password: passwordRule.optional(),
  })
)

export const getUserValidator = vine.compile(
  vine.object({ params: vine.object({ id: idDoesExistRule }) })
)

export const deleteUserValidator = vine.compile(
  vine.object({ params: vine.object({ id: idDoesExistRule }) })
)
