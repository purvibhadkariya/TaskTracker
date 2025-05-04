import { Document, Model, Schema, Types, model } from "mongoose";

export interface IUser extends Document {
  userId: Types.ObjectId;
  projectName: string;
}

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    projectName: { type: String, trim: true, unique: true, sparse: true },
  },
  { timestamps: true }
);

export const project: Model<IUser> = model<IUser>("project", userSchema);
