import { Request as Req, Response as Res, NextFunction as Next } from 'express'

function annotate(req: Req, res: Res, next: Next){
	
	const date = new Date

	console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${req.method} ${req.url} - ${res.statusCode}`)	

	next()

}

export { annotate }