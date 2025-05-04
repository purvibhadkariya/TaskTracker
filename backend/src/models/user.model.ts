import { Document, Model, Schema, model } from "mongoose";


export interface IUser extends Document {
    emailId: string,
    userName : string,
    password: string,
    country: string,
    refreshToken: string, 
    token: string
}


const userSchema = new Schema(
  {
    emailId: { type: String, unique: true, trim: true, required: true },
    userName: { type: String, trim: true, unique: true, sparse: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    token: {type: String},
    refreshToken: { type: String },
  },
  { timestamps: true }
);


export const User: Model<IUser> = model<IUser>('User', userSchema);