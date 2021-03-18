import { Router } from 'express'
import userController from './controllers/UserController'
import sessionController from './controllers/SessionController'

const routes = Router()


routes.post('/user', userController.create)

routes.post('/session', sessionController.create)


export { routes }
