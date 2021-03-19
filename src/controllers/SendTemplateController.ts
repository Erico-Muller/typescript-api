import { Request as Req, Response as Res } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { getCustomRepository } from 'typeorm'


class SendTemplateController{

    async imTired(req: Req, res: Res){
        return res.send('<h1>I\'m tired, I\'m stop developing today</h1>')
    }

}


export default new SendTemplateController