import vine from '@vinejs/vine'

export const createMenu = vine.compile(
  vine.object({
    name: vine.string(),
    business_id: vine.string(),
    description: vine.string(),
    price: vine.number(),
    image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
  })
)
