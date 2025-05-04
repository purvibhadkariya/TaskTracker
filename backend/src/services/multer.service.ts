import multer from "multer";
import { Request, Response, NextFunction } from "express";

export const intializeMulter = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage });
        let uploadFn = upload.any();
        uploadFn(req, res, function (err) {
            if (err) {
                next(err);
            }
            next();
        })
    }
}

export const saveImageMulter = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const storage = multer.diskStorage({
            destination: function(req, file, callback) {
                callback(null, '/images');
            },
            filename: function (req, file, callback) {
                callback(null, new Date() + "-"+ file.fieldname);
            }
        });
        const upload = multer({ storage: storage });
        let uploadFn = upload.single('heroImg');
        uploadFn(req, res, function (err) {
            if (err) {
                next(err);
            }
            next();
        })
    }
}


export const intializeMulterCustom = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const storage = multer.memoryStorage();
        // const storage = multer.diskStorage({});
        const upload = multer({ storage: storage });
        let uploadFn = upload.any();
        uploadFn(req, res, function (err) {
            if (err) {
                next(err);
            }
            next();
        })
    }
}

// export const removeAttachmentFile = (id: any, attachmentType?: any) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const attachment: IAttachment = await Attachment.findById(id).lean()
//             if (attachment) {
//                 await removeAttachmentFileFromS3(attachment.url, (attachmentType && attachmentType === 'public'))
//                 await Attachment.findByIdAndRemove(id)
//             }
//             resolve(`Deleted Attachment`)
//         } catch (err) {
//             logger.error(err)
//             reject(err)
//         }
//     })
// }