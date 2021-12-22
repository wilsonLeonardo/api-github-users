import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'UsersController.create')
  Route.get('/', 'UsersController.index').middleware('auth')
}).prefix('/user')

export default Route
