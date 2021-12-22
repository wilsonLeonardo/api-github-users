import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GitHubUser from 'App/Models/GitHubUser'
import axios from 'axios'

export default class GitHubController {
  public async list({ request }: HttpContextContract) {
    try {
      const { user } = request.params()
      const data = await axios.get(`https://api.github.com/users/${user}`).then((res) => res.data)

      const githubUser = new GitHubUser()

      await githubUser.setUser(data)

      return githubUser.toJson()
    } catch (err) {
      throw err
    }
  }
}
