import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
  vine.object({
    fullname: vine.string().minLength(3).maxLength(100),
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)
