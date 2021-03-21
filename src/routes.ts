import { Router } from 'express'
import userController from './controllers/UserController'
import sessionController from './controllers/SessionController'
import permissionsController from './controllers/PermissionController'
import rolesController from './controllers/RolesController'
import sendTemplate from './controllers/SendTemplateController'
import { is } from './middlewares/permission'

const routes = Router()


routes.get('/user', is(['USER', 'ADMIN']), userController.readOne)
routes.post('/user', userController.create)

routes.post('/session', is(['ADMIN']), sessionController.create)

routes.post('/permission', is(['ADMIN']), permissionsController.create)

routes.post('/role', is(['ADMIN']), rolesController.create)


//PAGES
routes.get('/home', sendTemplate.execute)


export { routes }