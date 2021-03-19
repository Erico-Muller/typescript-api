import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import { Users } from '../models/Users'
import { decode } from 'jsonwebtoken'


async function decoder(req: Req): Promise<Users | undefined>{

    const authHeader = req.headers.authorization || ''

    const userRepository = getCustomRepository(UsersRepository)

    const [ , token ] = authHeader?.split(' ')
    const payLoad = decode(token)

    const user = userRepository.findOne(payLoad?.sub, { relations: ['roles'] })

    return user

}

function is(role: string[]){

    const roleAuthorized = async (req: Req, res: Res, next: Next) => {

        const user = await decoder(req)

        const userRoles = user?.roles.map(role => role.name)

        const rolesExists = userRoles?.some(r => role.includes(r))

        if(rolesExists)
            return next()

        return res.status(401).json({ message: 'not authorization' })

    }

    return roleAuthorized

}

export { is }