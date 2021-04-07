import { Request as Req, Response as Res } from 'express'
import { getCustomRepository } from 'typeorm'
import { PermissionRepository } from '../repositories/PermissionRepository'
import * as yup from 'yup'


class PermissionController {

    async create(req: Req, res: Res){
    
        const { name, description } = req.body

        const permissionRepository = getCustomRepository(PermissionRepository)


        const schema = yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required()
        })

        try{
            await schema.validate(req.body, { abortEarly: true })
        } catch(err) {
            return res.status(400).json({ error: err })
        }


        const permissionExists = await permissionRepository.findOne({ name })

        if(permissionExists)
            return res.json({ error: 'user already exists' })


        const permission = permissionRepository.create({ name, description })
        await permissionRepository.save(permission)

        res.status(201).json(permission)

    }

	async readOne(req: Req, res: Res){

		const { name } = req.body

        const permissionRepository = getCustomRepository(PermissionRepository)


		const schema = yup.object().shape({
			name: yup.string().require()
		})

		try{
			await schema.validate(req.body, { abortEarly: true })
		} catch(err) {
			return res.status(400).json({ error: err })
		}


		const permission = await permissionRepository.findOne({ name })

		if(!permission)
			return res.status(404).json({ error: 'permission does not exists' })

		return res.json(permission)

	}

}


export default new PermissionController()
