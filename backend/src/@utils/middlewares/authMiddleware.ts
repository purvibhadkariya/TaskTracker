import { NextFunction, Response } from "express"
import Jwt from 'jsonwebtoken'
import * as config from '../../config';
import resMiddlewareCommon from "./resMiddleware";

export function  HandleAuthentication(req: any, res: Response, next: NextFunction) {
    const bearer =  req.headers.authorization as string
    const token: string = bearer?.replace('Bearer ', '')


    Jwt.verify(token, config.JWT_SECRET, async (err: any, decodedToken: any) => {
        if (err) {  
            resMiddlewareCommon(res,false,"Unauthorized","",1001)
        } else {
            const user = decodedToken
            req.user = user
            next()
        }
    })
}
