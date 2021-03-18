import { Request as Req, Response as Res } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import * as yup from 'yup'


class UsersController{

    async create(req: Req, res: Res){

        const { username, email, password } = req.body

        const userRepository = getCustomRepository(UsersRepository)


        const schema = yup.object().shape({
            username: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
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


        const hashPassword = await hash(password, 8)

        interface User{
            username: string,
            email: string,
            password?: string
        }

        const userData: User = { username, email, password: hashPassword }

        const user = userRepository.create(userData)
        await userRepository.save(user)
        
        delete userData.password
        return res.status(201).json(userData)

    }

}


export { UsersController }