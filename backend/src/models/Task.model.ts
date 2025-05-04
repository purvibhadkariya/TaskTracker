import { Document, Model, Schema, Types, model } from "mongoose";

export interface ITask extends Document {
  TaskId: Types.ObjectId;
  projectId: Types.ObjectId;
  Title: string;
  Description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
    Title: { type: String, trim: true, required:true},
    Description: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    completionDate: { type: Date }
  },
  { timestamps: true }
);

export const Task: Model<ITask> = model<ITask>("Task", TaskSchema);
