import { Request as Req, Response as Res } from 'express'
import { getCustomRepository } from 'typeorm'
import { RolesRepository } from '../repositories/RolesRepository'
import { PermissionRepository } from '../repositories/PermissionRepository'
import * as yup from 'yup'


class RolesController {

    async create(req: Req, res: Res){
    
        const { name, description, permissions } = req.body

        const rolesRepository = getCustomRepository(RolesRepository)
        const permissionRepository = getCustomRepository(PermissionRepository)


        const schema = yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required(),
            permissions: yup.array().required()
        })

        try{
            await schema.validate(req.body, { abortEarly: true })
        } catch(err) {
            return res.status(400).json({ error: err })
        }


        const roleExists = await rolesRepository.findOne({ name })

        if(roleExists)
            return res.json({ error: 'user already exists' })


        const permissionsExists = await permissionRepository.findByIds(permissions)

        const role = rolesRepository.create({ name, description, permissions: permissionsExists })
        await rolesRepository.save(role)

        res.status(201).json(role)

    }

}


export default new RolesController()