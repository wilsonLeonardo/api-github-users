import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async create({ request, auth }: HttpContextContract) {
    try {
      const { name, email, password } = request.all()

      const user = await User.create({
        name,
        email,
        password,
      })

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1 day',
      })

      return { ...user.serialize(), token }
    } catch (err) {
      throw err
    }
  }

  public async index({ auth }) {
    try {
      return auth.user
    } catch (err) {
      throw err
    }
  }
}
