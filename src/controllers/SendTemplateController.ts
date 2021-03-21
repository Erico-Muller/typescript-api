import { Request as Req, Response as Res } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { getCustomRepository } from 'typeorm'
import { sendTemplate } from '../services/SendTemplate'


class SendTemplateController{

    async execute(req: Req, res: Res){
        
        return sendTemplate('home', {}, res)

    }

}


export default new SendTemplateController