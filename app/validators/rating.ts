import vine from '@vinejs/vine'

export const createRating = vine.compile(
  vine.object({
    username: vine.string().nullable(),
    rating: vine.number(),
    business_id: vine.string(),
  })
)
