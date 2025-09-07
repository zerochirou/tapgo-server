import vine from '@vinejs/vine'

export const createCategoryMenu = vine.compile(
  vine.object({
    category_name: vine.string(),
    emoji: vine.string(),
  })
)
