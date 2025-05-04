// import { Request, Response } from "express"
// import resMiddlewareCommon from "../../../@utils/middlewares/resMiddleware";
// import { Controller, Get } from "@overnightjs/core";
// import { blogList, getBlogDetails } from "../../../services/blog.service";

// @Controller('public/home')
// export class HomeController {

//     @Get('')
//     async  getBlogs(req:any, res: Response){
//         try {
//             const offset = req.query.offset as any;
//             const category = req.query?.category !== 'undefined' ? req.query.category as string : undefined;
//             const data = await blogList(offset, category)
//             resMiddlewareCommon(res, true, "success", data)
//         } catch (error: any) {
//             resMiddlewareCommon(res, false, "Somethign Went wrong. Please try again")
//         }
//     }


//     @Get('blog')
//     async getBlog(req: any, res: Response){
//         try {
//             const slug  = req.query.slug
//             const data = await getBlogDetails(slug)
//             resMiddlewareCommon(res, true, "success", data)
//         } catch (error: any) {
//             resMiddlewareCommon(res, false, "Somethign Went wrong. Please try again")
//         }
//     }
// }