import { ClassMiddleware, Controller, Delete, Get, Middleware, Post, Put } from "@overnightjs/core";
import { HandleAuthentication } from "../../@utils/middlewares/authMiddleware";
import { Response } from "express";
import resMiddlewareCommon from "../../@utils/middlewares/resMiddleware";
// import { intializeMulter, saveImageMulter } from "../../services/multer.service";
// import { addComment, createproject } from "../../services/project.service";
// import { getUserDetailsById } from "../../services/auth.service";
import { createproject, deleteProject, getAllProjects, updateProject } from "../../services/project.service";
import { getUserDetailsById } from "../../services/auth.service";

@Controller("project")
@ClassMiddleware(HandleAuthentication)
export class projectController {
  @Post("create-project")
  // @Middleware(intializeMulter())
  async createproject(req: any, res: Response) {
    try {
      const { projectName } = req.body;
      const userId = req.user?.id;
      const data = await createproject(req, userId, projectName);
      resMiddlewareCommon(res, true, "success", data);
    } catch (error: any) {
      resMiddlewareCommon(res, false, error.message);
    }
  }

  @Get("get-all")
  async getAllProjects(req: any, res: Response) {
    try {
      const userId = req.user?.id; // remove this if you want global fetch
      const data = await getAllProjects(userId); // or just getAllProjects() for all
      resMiddlewareCommon(res, true, "Fetched all projects successfully", data);
    } catch (error: any) {
      resMiddlewareCommon(res, false, error.message);
    }
  }

  @Get("user-details")
  async getUserDetails(req: any, res: Response) {
    try {
      const userId = req?.user.id;
      const data = await getUserDetailsById(userId);
      resMiddlewareCommon(res, true, "user details", data);
    } catch (error: any) {
      resMiddlewareCommon(res, false, "Something Went Wrong. please try again");
    }
  }

  @Delete("delete-project/:id")
  async deleteProject(req: any, res: Response) {
    try {
      const projectId = req.params.id;
      const userId = req.user?.id;

      const result = await deleteProject(projectId, userId); // calling service
      resMiddlewareCommon(res, true, "Project deleted successfully", result);
    } catch (error: any) {
      resMiddlewareCommon(res, false, error.message);
    }
  }

  @Put("edit-project/:id")
  async editProject(req: any, res: Response) {
    try {
      const projectId = req.params.id;
      const userId = req.user?.id;
      const { projectName } = req.body;

      if (!projectName) {
        return resMiddlewareCommon(res, false, "Project name is required");
      }

      const result = await updateProject(projectId, userId, projectName);
      resMiddlewareCommon(res, true, "Project updated successfully", result);
    } catch (error: any) {
      resMiddlewareCommon(res, false, error.message);
    }
  }
}
