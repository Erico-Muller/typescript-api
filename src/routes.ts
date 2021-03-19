import { Router } from 'express'
import userController from './controllers/UserController'
import sessionController from './controllers/SessionController'
import permissionsController from './controllers/PermissionController'
import rolesController from './controllers/RolesController'
import sendTemplate from './controllers/SendTemplateController'
import { is } from './middlewares/permission'

const routes = Router()


routes.get('/user', userController.readOne)
routes.post('/user', userController.create)

routes.post('/session', sessionController.create)

routes.post('/permission', permissionsController.create)

routes.post('/role', rolesController.create)


routes.get('/home', is(['USER']), sendTemplate.imTired)


export { routes }