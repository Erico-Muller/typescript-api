import { Request as Req, Response as Res } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { getCustomRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import * as yup from 'yup'
//import { session } from '../app'


class SessionController {

    async create(req: Req, res: Res){

        const { email, password } = req.body

        const userRepository = getCustomRepository(UsersRepository)


        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required()
        })

        try{
            await schema.validate(req.body, { abortEarly: true })
        } catch(err) {
            return res.status(400).json({ error: err })
        }


        const user = await userRepository.findOne({ email })

        if(!user)
            return res.status(400).json({ error: 'user does not exists' })

        const matchPassword = await compare(password, String(user.password))

        if(!matchPassword)
            return res.status(400).json({ error: 'incorrect email or password' })

            
        const token = sign({}, 'e8caa8d36922be22f32e083011c0efbc', {
            subject: user.id,
            expiresIn: '1d'
        })

        req.session.state = true
        req.session.email = email

        res.json({ token, user })

    }

}


export default new SessionController