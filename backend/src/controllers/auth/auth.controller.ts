import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { getUserDetailsById, login, signup } from "../../services/auth.service";
import resMiddlewareCommon from "../../@utils/middlewares/resMiddleware";



@Controller('auth')
export class AuthController {

    @Post('login')
    async login(req: Request, res: Response) {
        try {
            const { emailId, password } = req.body;
            const data = await login(emailId, password)
            resMiddlewareCommon(res, true, "success", data)
        } catch (error: any) {
            resMiddlewareCommon(res, false, "Something Went Wrong. please try again");
        }
    }               


    @Post('signup')
    // @Middleware(intializeMulter())
    async signUp(req: Request, res: Response) {
        try {
            
            const {emailId, userName, country, password} = (req.body);
            // const { userName, emailId, password } = JSON.parse(req.body.data);
            const data = await signup(
            //   req,
              emailId,
              userName,
              country,
              password
            );
            resMiddlewareCommon(res, true, "success", data)
        } catch (error: any) {
            resMiddlewareCommon(res, false, "Something Went Wrong. please try again");
        }
    }

}