const AuthController = () => import('#controllers/auth_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const BusinessDomainController = () => import('#controllers/business_domains_controller')
const MenusController = () => import('#controllers/menus_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(() => {
    router.post('/signup', [AuthController, 'register'])
    router.post('/login', [AuthController, 'store'])
    router.get('/me', [AuthController, 'me']).use(middleware.auth())
  })
  .prefix('/auth')

router
  .group(() => {
    router.get('/all', [CategoriesController, 'getAllCategories'])
    router
      .get('/find/id/:id', [CategoriesController, 'getCategoryById'])
      .where('id', router.matchers.uuid())
    router.post('/find/name', [CategoriesController, 'getCategoryByName'])
    router.post('/create', [CategoriesController, 'createCategory'])
    router.put('/edit', [CategoriesController, 'editCategory'])
    router
      .delete('/remove/id/:id', [CategoriesController, 'deleteCategory'])
      .where('id', router.matchers.uuid())
  })
  .prefix('/category')

router
  .group(() => {
    router.get('/all', [BusinessDomainController, 'getAllBusinessDomain'])
    router
      .get('/find/id/:id', [BusinessDomainController, 'getBusinessDomainById'])
      .where('id', router.matchers.uuid())
    router
      .post('/create', [BusinessDomainController, 'createBusinessDomain'])
      .use(middleware.auth())
    router
      .delete('/remove/id/:id', [BusinessDomainController, 'removeBusinessDomainById'])
      .where('id', router.matchers.uuid())
      .use(middleware.auth())
  })
  .prefix('/business_domain')

router
  .group(() => {
    router.get('/all', [MenusController, 'getAllMenus'])
    router.get('/find/id/:id', [MenusController, 'getMenuById']).where('id', router.matchers.uuid())
    router.post('/find/name', [MenusController, 'getMenyByName'])
    router.post('/create', [MenusController, 'createMenu']).use(middleware.auth())
    router
      .put('/edit/id/:id', [MenusController, 'editMenu'])
      .where('id', router.matchers.uuid())
      .use(middleware.auth())
    router
      .delete('/remove/id/:id', [MenusController, 'removeMenu'])
      .where('id', router.matchers.uuid())
      .use(middleware.auth())
  })
  .prefix('/menu')
