import vine from '@vinejs/vine'

export const createRating = vine.compile(
  vine.object({
    username: vine.string(),
    rating: vine.number(),
    business_id: vine.string(),
  })
)
