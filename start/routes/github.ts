import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:user', 'GitHubController.list').middleware('auth')
})
  .prefix('/github')
  .middleware('auth')

export default Route
