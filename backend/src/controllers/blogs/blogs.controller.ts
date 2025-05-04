// import { ClassMiddleware, Controller, Get, Middleware, Post } from "@overnightjs/core";
// import { HandleAuthentication } from "../../@utils/middlewares/authMiddleware";
// import { Response } from "express";
// import resMiddlewareCommon from "../../@utils/middlewares/resMiddleware";
// import { intializeMulter, saveImageMulter } from "../../services/multer.service";
// // import { addComment, createBlog } from "../../services/blog.service";
// import { getUserDetailsById } from "../../services/auth.service";

// @Controller('blogs')
// @ClassMiddleware(HandleAuthentication)
// export class BlogController {

//     @Post('create-blog')
//     @Middleware(intializeMulter())
//     async createBlog(req: any, res: Response){
//         try{
//             const { title, description, category, slug  } = JSON.parse(req.body.data);
//             const userId = req.user?.id
//             const data = await createBlog(req, title, description, category, userId, slug)
//             resMiddlewareCommon(res, true, "success", data)
//         }catch(error:any){
//             resMiddlewareCommon(res, false, error.message);
//         }
//     }

//     @Post('add-comment')
//     async comment(req: any, res: Response){
//         try {
//             const { message, blogId, replyId } = req.body;
//             const userId = req.user?.id
//             const data = await addComment(message, userId, blogId, replyId)
//             resMiddlewareCommon(res, true, "success", data)
//         } catch (error: any) {
//             resMiddlewareCommon(res, false, "Something Went Wrong. please try again");
//         }
//     }

//     @Get('user-details')
//     async getUserDetails(req: any, res: Response) {
//         try {
//             const userId = req?.user.id;
//             const data = await getUserDetailsById(userId);
//             resMiddlewareCommon(res, true, "user details", data)
//         } catch (error: any) {
//             resMiddlewareCommon(res, false, "Something Went Wrong. please try again")
//         }
//     }
// }