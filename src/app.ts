import 'reflect-metadata'
import express from 'express'
import session from 'express-session'
import { routes } from './routes'
import createConnection from './database'
import { annotate } from './middlewares/annotate'

createConnection()

const server = express()

server.use(session({
    secret: '7ddf32e17a6ac5ce04a8ecbf782ca509',
    resave: true,
    saveUninitialized: true
}))
server.use(express.json())
server.use(routes)
server.use(annotate)

export { server }