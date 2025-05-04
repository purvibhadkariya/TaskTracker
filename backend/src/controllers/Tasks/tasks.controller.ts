import {
  ClassMiddleware,
  Controller,
  Delete,
  Get,
  Middleware,
  Put,
  Post,
} from "@overnightjs/core";
import { HandleAuthentication } from "../../@utils/middlewares/authMiddleware";
import { Response } from "express";
import resMiddlewareCommon from "../../@utils/middlewares/resMiddleware";
import { createTask, DeleteTask, GetAllProjectTasks, GetAllTasks, GetSingleTask, UpdateTask } from "../../services/tasks.service";

@Controller("tasks")
@ClassMiddleware(HandleAuthentication)
export class TaskController {
  @Post("create-task")
  async createtask(req: any, res: Response) {
    try {
      const { Title, Description, projectId, completionDate } = req.body;
      const userId = req.user?.id;
      const data = await createTask(req, Title, Description, completionDate, projectId, userId);
      resMiddlewareCommon(res, true, "success", data);
    } catch (error: any) {
      resMiddlewareCommon(res, false, error.message);
    }
  }

  @Delete("delete-task/:id")
  async deletetask(req: any, res: Response) {
    try {
      const TaskId = req.params.id;
      const userId = req.user?.id;
      const result = await DeleteTask(req, TaskId, userId);
      resMiddlewareCommon(res, true, "success", result);
    } catch (error: any) {
      resMiddlewareCommon(res, false, error.message);
    }
  }

  @Put("update-task/:id")
  async updatetask(req: any, res: Response) {
    try {
      const TaskId = req.params.id;
      const userId = req.user?.id;
      const { Title, Description, status, completionDate} = req.body;

      const result = await UpdateTask(TaskId, userId, {
        Title,
        Description,
        status,
        completionDate
      });
      resMiddlewareCommon(res, true, "Task updated successfully", result);
    } catch (error: any) {
      resMiddlewareCommon(res, false, error.message);
    }
  }

  @Get("all")
  async getAllTasks(req: any, res: Response) {
    try {
      const userId = req.user?.id;
      const tasks = await GetAllTasks(userId);
      resMiddlewareCommon(res, true, "Tasks fetched successfully", tasks);
    } catch (error: any) {
      resMiddlewareCommon(res, false, error.message);
    }
  }

  @Get('project-tasks')
  async getAllProjectTask(req: any, res: Response) {
    try {
      const userId = req.user?.id;
      const projectId = req.query.projectId;
      const tasks = await GetAllProjectTasks(userId, projectId);
      resMiddlewareCommon(res, true, "Tasks fetched successfully", tasks);
    } catch (error: any) {
      resMiddlewareCommon(res, false, error.message);
    }
  }

  @Get(":id")
  async getTaskById(req: any, res: Response) {
    try {
      const taskId = req.params.id;
      const userId = req.user?.id;
      const task = await GetSingleTask(taskId, userId);
      resMiddlewareCommon(res, true, "Task fetched successfully", task);
    } catch (error: any) {
      resMiddlewareCommon(res, false, error.message);
    }
  }
}


