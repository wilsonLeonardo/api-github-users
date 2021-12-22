import axios from 'axios'
import moment from 'moment'

export default class GitHubUser {
  private name: string
  private username: string
  private organization?: string
  private location?: string
  private email?: string
  private website?: string
  private twitter?: string
  private repositories?: Array<any>

  constructor() {}

  private async setRepositories(repositoriesUrl) {
    const repos = await axios.get(repositoriesUrl).then((res) => res.data)

    return repos
      .map((repo) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { name, full_name, html_url, stargazers_count, updated_at, description } = repo
        return {
          name,
          fullName: full_name,
          description,
          htmlUrl: html_url,
          stars: stargazers_count,
          updatedAt: `Updated ${moment(updated_at).fromNow()}`,
        }
      })
      .sort((a, b) => b?.stars - a?.stars)
  }

  public async setUser(user) {
    if (user) {
      if (user.name) this.name = user.name
      if (user.login) this.username = user.login
      if (user.company) this.organization = user.company
      if (user.email) this.email = user.email
      if (user.blog) this.website = user.blog
      if (user.twitter_username) this.twitter = user.twitter_username
      if (user.repos_url) this.repositories = await this.setRepositories(user.repos_url)
    }
  }

  public toJson() {
    const { name, username, organization, email, location, twitter, website, repositories } = this

    const jsonValues: any = {}

    if (name) jsonValues.name = name
    if (username) jsonValues.username = username
    if (organization) jsonValues.organization = organization
    if (email) jsonValues.email = email
    if (location) jsonValues.location = location
    if (twitter) jsonValues.twitter = twitter
    if (website) jsonValues.website = website
    if (repositories) jsonValues.repositories = repositories

    return jsonValues
  }
}
