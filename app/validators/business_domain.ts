import vine from '@vinejs/vine'

export const createBusinessDomain = vine.compile(
  vine.object({
    business_name: vine.string(),
    address: vine.string(),
    description: vine.string(),

    image_background: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    business_icon: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),

    user_id: vine.string(),
    category_id: vine.string(),
  })
)
