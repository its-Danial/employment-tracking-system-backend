import vine from '@vinejs/vine'

export const createTenantValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(100),
    title: vine.string().minLength(2).maxLength(200),
    subdomain: vine
      .string()
      .alphaNumeric()
      .isUnique({ table: 'tenants', column: 'subdomain', global: true }),
  })
)
