import { Request as Req, Response as Res } from 'express'
import { Roles } from '../models/Roles'
import { UsersRepository } from '../repositories/UsersRepository'
import { RolesRepository } from '../repositories/RolesRepository'
import { getCustomRepository } from 'typeorm'
import { hashSync } from 'bcryptjs'
import * as yup from 'yup'


interface User{
    username: string,
    email: string,
    password?: string,
    roles: Roles[]
}


class UserController{

    async create(req: Req, res: Res){

        const { username, email, password, roles } = req.body

        const userRepository = getCustomRepository(UsersRepository)
        const rolesRepository = getCustomRepository(RolesRepository)


        const schema = yup.object().shape({
            username: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            roles: yup.array().required()
        })

        try{
            await schema.validate(req.body, { abortEarly: true })
        } catch(err) {
            return res.status(400).json({ error: err })
        }


        const usernameExists = await userRepository.findOne({ username })
        const emailExists = await userRepository.findOne({ email })

        if(usernameExists)
            return res.status(400).json({ message: 'username already exists' })

        if(emailExists)
            return res.status(400).json({ message: 'email already exists' })

        const roles = await rolesRepository.findByIds(roles)


        const hashPassword = hashSync(password, 8)

        const userData: User = { username, email, password: hashPassword, roles }

        const user = userRepository.create(userData)
        await userRepository.save(user)
        
        delete userData.password
        return res.status(201).json(userData)

    }


    async readOne(req: Req, res: Res){

        const { email } = req.body

        const userRepository = getCustomRepository(UsersRepository)


        const schema = yup.object().shape({
            email: yup.string().email().required()
        })

        try{
            await schema.validate(req.body, { abortEarly: true })
        } catch(err) {
            return res.status(400).json({ error: err })
        }


        const user = await userRepository.findOne({ email })

        if(!user)
            return res.status(404).json({ error: 'user does not exists' })

        delete user.password

        return res.json(user)

    }

}


export default new UserController
