import vine from '@vinejs/vine'

const idDoesExistRule = vine
  .string()
  .uuid({ version: [4] })
  .doesExist({ table: 'trades', column: 'id' })

export const createTradeValidator = vine.compile(
  vine.object({
    name: vine.string().isUnique({ table: 'trades', column: 'name' }).minLength(2).maxLength(100),
    description: vine.string().maxLength(255).optional(),
  })
)

export const updateTradeValidator = vine.compile(
  vine.object({
    params: vine.object({ id: idDoesExistRule }),
    name: vine
      .string()
      .minLength(2)
      .maxLength(100)
      .isUnique({
        table: 'trades',
        column: 'name',
        // Note: Handle the whereNot for excluding current trade (maybe in controller)
      })
      .optional(),
    description: vine.string().maxLength(255).optional(),
  })
)

export const getTradeValidator = vine.compile(
  vine.object({ params: vine.object({ id: idDoesExistRule }) })
)

export const deleteTradeValidator = vine.compile(
  vine.object({ params: vine.object({ id: idDoesExistRule }) })
)
