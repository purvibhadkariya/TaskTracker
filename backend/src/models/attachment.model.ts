import { Document, Schema, Model, model } from 'mongoose';

export interface IAttachment extends Document {
    filename: string;
    url: string;
    type: string;
}

const AttachmentSchema = new Schema({
    filename: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String }
}, { timestamps: true });

export const Attachment: Model<IAttachment> = model<IAttachment>('Attachment', AttachmentSchema);