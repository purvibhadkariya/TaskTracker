// import multer from "multer";
// import { User } from "../models/user.model" 
// import { storeAttachment } from "./attachment.service";
// import path from "path";
// import fs  from "fs";




// export const createBlog = async (req: any, title: string, description: string, category: string, userId: string, slug: string) => {
//     const user = await User.findOne({_id: userId})
//     if(!user){
//         throw new Error("Invalid Request")
//     }

//     // const categoryData = await

//     if(req.files.length){
//         const bufferData = req.files[0].buffer;
//         const mimeType = req.files[0]?.mimetype
//         const originalFileName = req.files[0].originalname;
//         const extension = path.extname(originalFileName).slice(1);
//         const fileName = `${new Date().getTime()}.${extension}`;
//         const imgPath = path.join(__dirname, '../../public/images',fileName);
//         fs.writeFileSync(imgPath, bufferData);

//         const attachmentData = await storeAttachment(originalFileName, `images/${fileName}`, mimeType);
//         return Blog.create({ title: title, description: description, category: category, slug: slug, author: user._id, heroImg: attachmentData._id  })
//     }
// }


// export const blogList = async (offset: number, category: any, limit: number = 4) =>{
//     if(category && category.length  > 1){
//         return Blog.find({ category: category }).populate('heroImg').populate('category').populate('author').skip(offset).limit(limit).lean();
//     }else{
//         return Blog.find().populate('heroImg').populate('category').populate('author').skip(offset).limit(limit).lean();
//     }
// }  


// export const addComment =async (message: string, userId: string, blogId: string, replyId: string) => {
//     const user = await User.findOne({_id: userId});
//     if(!user){
//         throw new Error("User doesn't Exists")
//     }

//     const blog = await Blog.findOne({ _id: blogId })
//     if(!blog){
//         throw new Error(" Blog doesn't exists ")
//     }

//     if(replyId){
//         const mainComment = await Comment.findOne({ _id: replyId });
//         if(!mainComment){
//             throw new Error(" Comment not found")
//         }

//         return Comment.create({ message: message, user: user._id, blog: blog._id, replyId: replyId })
//     }

//     return Comment.create({ message: message, user: user._id, blog: blog._id})
// }



// export const getBlogDetails =async (slug: string) => {
//     const blog = await Blog.findOne({ slug: slug }).populate('category').populate('heroImg').populate('author').populate({path:'author',populate:{path:'profile'}}).lean();
//     if(!blog){
//         throw new Error("Blog id doesn't exists")
//     }

//     const comments = await Comment.find({ blog: blog._id , replyId: { $exists: false } }).populate('user').populate({path:'user',populate:{path:'profile'}}).sort({ createdAt: -1 }).lean()
//     const commentList = []

//     for (let i = 0; i < comments.length; i++) {
//         const commentData = {} as any;
//         commentData.comment = comments[i];
//         const replies = await getCommentReplies(blog._id, commentData.comment._id);
//         commentData.replies = replies
//         commentList.push(commentData);
//     }

//     return {
//         blog: blog,
//         comments: commentList
//     }
// }


// export const getCommentReplies = async (blogId: string, commentId: string) => {
//     const replyData = [];
//     const replies = await Comment.find({ thread: blogId, replyId: commentId }).sort({ createdAt: 1 }).populate('user').populate({path:'user',populate:{path:'profile'}}).lean();
//     for (let i = 0; i < replies.length; i++) {
//         const data = {} as any;
//         data.comment = replies[i];
//         replyData.push(data);
//     }
//     return replyData;
// }