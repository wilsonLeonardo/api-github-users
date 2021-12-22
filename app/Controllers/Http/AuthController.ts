import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    try {
      const { email, password } = request.all()

      const user = await User.findBy('email', email)

      if (!user) throw { code: 404, message: 'User not found' }

      if (!(await user.comparePassword(password))) throw { code: 401, message: 'Unauthorized' }

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1 day',
      })

      return { ...user.serialize(), token }
    } catch (err) {
      throw err
    }
  }
}
