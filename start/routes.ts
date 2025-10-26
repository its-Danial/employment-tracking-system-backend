/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const TenantsController = () => import('#controllers/tenants_controller')
const UsersController = () => import('#controllers/users_controller')
const TradesController = () => import('#controllers/trades_controller')

// Auth
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('auth')

// Users
router
  .group(() => {
    router.get('/', [UsersController, 'index'])
    router.get('/:id', [UsersController, 'show'])
    router.put('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'destroy'])
  })
  .prefix('users')
  .use(middleware.auth())

// Trades
router
  .group(() => {
    router.get('/', [TradesController, 'index'])
    router.get('/:id', [TradesController, 'show'])
    router.put('/:id', [TradesController, 'update'])
    router.delete('/:id', [TradesController, 'destroy'])
  })
  .prefix('trades')
  .use(middleware.auth())

// Tenants
router
  .group(() => {
    router.get('/info', [TenantsController, 'info']) // Not authenticated so front-end can get tenant info
    router.get('/list', [TenantsController, 'list']).use(middleware.auth())
  })
  .prefix('tenant')
