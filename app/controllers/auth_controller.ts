import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password', 'fullname'])
      const user = await User.create({
        fullName: data.fullname,
        email: data.email,
        password: data.password,
      })
      return response.created(user)
    } catch (error) {
      return response.internalServerError(error.message)
    }
  }

  async store({ response, request }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user, ['*'], {
        expiresIn: '30 days',
      })

      return response.ok({ token })
    } catch (error) {
      return response.internalServerError(error.message)
    }
  }

  async me({ auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      return auth.user
    } catch (error) {
      return response.internalServerError(error.message)
    }
  }
}
