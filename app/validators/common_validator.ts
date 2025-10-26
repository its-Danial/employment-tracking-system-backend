import vine from '@vinejs/vine'

export const passwordRule = vine.string().minLength(8).maxLength(100)
