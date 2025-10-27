import vine from '@vinejs/vine'

export const passwordRule = vine.string().minLength(8).maxLength(100)

export const paginationRule = vine.object({
  page: vine.number().min(1).optional().requiredIfExists('limit'),
  limit: vine.number().min(1).max(100).optional().requiredIfExists('page'),
  sortBy: vine.string().optional(),
  sortOrder: vine.enum(['asc', 'desc']).optional(),
})
