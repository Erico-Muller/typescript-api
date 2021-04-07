import { Request as Req, Response as Res } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { getCustomRepository } from 'typeorm'
import { sendTemplate } from '../services/SendTemplate'
import { decode } from 'jsonwebtoken'
import request from 'request'


class SendTemplateController{

    async execute(req: Req, res: Res){
        
        const page = req.url.split('/')[1]
        console.log(req.body)

        if(page == 'login' && req.session?.state == true){

            const authHeader = req.headers.authorization || ''
            const token = authHeader?.split(' ')[1]
            const payLoad = decode(token)

			//request

            return 'aaaa'

        }

        const variables = {}

        return sendTemplate(page, variables, res)

    }

}


export default new SendTemplateController
