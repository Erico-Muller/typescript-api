import { Router } from 'express'
import { Request as Req, Response as Res } from 'express'
import userController from './controllers/UserController'
import sessionController from './controllers/SessionController'
import permissionsController from './controllers/PermissionController'
import rolesController from './controllers/RolesController'
import sendTemplate from './controllers/SendTemplateController'
import { is } from './middlewares/permission'

const routes = Router()


routes.get('/api/user', is(['USER', 'ADMIN']), userController.readOne)
routes.post('/api/user', userController.create)

routes.post('/api/session', is(['USER', 'ADMIN']), sessionController.create)

routes.post('/api/permission', is(['ADMIN']), permissionsController.create)

routes.post('/api/role', is(['ADMIN']), rolesController.create)


//PAGES
routes.get('/', (req: Req, res: Res) => res.redirect('http://localhost:4000/welcome', 302))
routes.get('/welcome', sendTemplate.execute)
routes.get('/home', sendTemplate.execute)
routes.get('/login', sendTemplate.execute)


export { routes }