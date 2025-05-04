import { project } from "../models/project.model";
import { Task } from "../models/Task.model";
import { User } from "../models/user.model";
import { Types } from "mongoose";

export const createTask = async (
  req: any,
  Title: string,
  Description: string,
  completionDate: Date,
  projectId: string,
  userId: string
) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new Error("Invalid Request");
  }

  const proj = await project.findOne({
    _id: new Types.ObjectId(projectId),
    userId: new Types.ObjectId(userId),
  });

  if (!proj) {
    throw new Error("Project not found or access denied");
  }

  const newTask = await Task.create({
    userId: new Types.ObjectId(userId),
    projectId: new Types.ObjectId(projectId),
    Title,
    Description,
    completionDate,
    status: "pending",
  });

  return newTask;
};

export const DeleteTask = async (req: any, TaskId: string, userId: string) => {
  const exist = await Task.findOne({
    _id: new Types.ObjectId(TaskId),
    userId: new Types.ObjectId(userId),
  });

  if (!exist) {
    throw new Error("task not found or access denied");
  }

  await Task.deleteOne({
    _id: new Types.ObjectId(TaskId),
  });

  return { message: "Task deleted successfully" };
};


// export const DeleteTask = async (req: any, TaskId: string, userId: string) => {
// const user = await User.findOne({ _id: userId });
//   if (!user) {
//     throw new Error("Invalid Request");
//   }

//   const exist = await Task.findOne({
//     _id: new Types.ObjectId(TaskId),
//   });

//   if (!exist) {
//     throw new Error("task not found or access denied");
//   }

//   await Task.deleteOne({
//     _id: new Types.ObjectId(TaskId),
//   });

//   return { message: "Task deleted successfully" };
// };


export const UpdateTask = async (
  TaskId: string,
  userId: string,
  updates: {
    Title?: string;
    Description?: string;
    status?: "pending" | "in-progress" | "completed";
    completionDate: Date
  }
) => {
  const exist = await Task.findOne({
    _id: new Types.ObjectId(TaskId),
    userId: new Types.ObjectId(userId),
  });

  if (!exist) {
    throw new Error("Task not found or access denied");
  }

  if(updates.status == 'completed'){
    const updatedTask = await Task.findByIdAndUpdate(
      TaskId,
      { $set: { Title: updates.Title, Description: updates.Description, status: updates.status , completionDate: new Date()} },
      { new: true }
      );
      return updatedTask;
  }else{
    const updatedTask = await Task.findByIdAndUpdate(
      TaskId,
      { $set: updates },
      { new: true }
      );
      return updatedTask;
  }


};


export const GetAllTasks = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const tasks = await Task.find({
    userId: new Types.ObjectId(userId),
  }).populate("projectId");

  const pendingCount = await Task.find(
    { userId: new Types.ObjectId(userId),
      $and: [
        { status: 'pending' },
        { completionDate: { $gt: new Date() } },
      ],
    }
  )

  const overdueCount = await Task.find(
    { userId: new Types.ObjectId(userId),
      status: { $ne: 'completed' }, // Status is NOT 'completed'
      $and: [
        { status: 'pending' },
        { completionDate: { $lt: new Date() } }, // Completion date is greater than the current date
      ],
    }
  )

  const completedCount = await Task.find(
    { userId: new Types.ObjectId(userId),
      status: 'completed',
    }
  )

  // Optional: check if no tasks exist
  if (!tasks || tasks.length === 0) {
    throw new Error("No tasks found for this user");
  }

  return {tasks:tasks, pending: pendingCount.length, overdue: overdueCount.length, completed: completedCount.length};
};

export const GetAllProjectTasks = async (userId: string, projectId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const projectData = await project.findById({_id: projectId});
  if(!projectData){
    throw new Error("Invalid Projec Id")
  }

  const tasks = await Task.find({
    userId: new Types.ObjectId(userId),
    projectId: projectData._id
  }).populate("projectId");

  const pendingCount = await Task.find(
    { userId: new Types.ObjectId(userId),
      projectId: projectData._id,
      $and: [
        { status: 'pending' },
        { completionDate: { $gt: new Date() } },
      ],
    }
  )

  const overdueCount = await Task.find(
    { userId: new Types.ObjectId(userId),
      projectId: projectData._id,
      status: { $ne: 'completed' }, // Status is NOT 'completed'
      $and: [
        { status: 'pending' },
        { completionDate: { $lt: new Date() } }, // Completion date is greater than the current date
      ],
    }
  )

  const completedCount = await Task.find(
    { userId: new Types.ObjectId(userId),
      projectId: projectData._id,
      status: 'completed',
    }
  )

  return {tasks:tasks, project: projectData, pending: pendingCount.length, overdue: overdueCount.length, completed: completedCount.length};
};

export const GetSingleTask = async (taskId: string, userId: string) => {
  if (!Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const task = await Task.findOne({
    _id: new Types.ObjectId(taskId),
    userId: new Types.ObjectId(userId),
  }).populate("projectId");

  if (!task) {
    throw new Error("Task not found or access denied");
  }

  return task;
};
