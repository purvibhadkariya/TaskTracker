import { Attachment } from "../models/attachment.model"


export const storeAttachment = async (fileName: string, url: string, type: string) => {
    return Attachment.findOneAndUpdate({
        url: url,
        filename: fileName
    }, {
        $set: {
            url: url,
            filename: fileName,
            type: type
        }
    }, {upsert: true, new: true}).lean()
}