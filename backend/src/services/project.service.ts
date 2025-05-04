// import multer from "multer";
import { User } from "../models/user.model";
import { project } from "../models/project.model";
import { Task } from "../models/Task.model";

export const createproject = async (req: any, userId: string, projectName: string) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new Error("Invalid Request");
  }

  const projectCount = await project.countDocuments({userId});

  if(projectCount >= 4){
    throw new Error("You can only create up to 4 projects.");
  }

  const newProject = await project.create({
    userId: user._id,
    projectName,
  });

  return newProject;


  //   if (req.files.length) {
  //     const bufferData = req.files[0].buffer;
  //     const mimeType = req.files[0]?.mimetype;
  //     const originalFileName = req.files[0].originalname;
  //     const extension = path.extname(originalFileName).slice(1);
  //     const fileName = `${new Date().getTime()}.${extension}`;
  //     const imgPath = path.join(__dirname, "../../public/images", fileName);
  //     fs.writeFileSync(imgPath, bufferData);

  //     const attachmentData = await storeAttachment(
  //       originalFileName,
  //       `images/${fileName}`,
  //       mimeType
  //     );
//   return project.create({
    // userId: user._id,
    // projectName: projectName,
    //   heroImg: attachmentData._id,
//   });
};
// };

export const getAllProjects = async (userId: string) => {
  return await project.find({ userId }); // to fetch projects created by specific user
};



export const deleteProject = async (projectId: string, userId: string) => {
  const foundProject = await project.findOne({ _id: projectId, userId });

  if (!foundProject) {
    throw new Error(
      "Project not found or you do not have permission to delete it."
    );
  }

  // Delete all tasks related to this project
  await Task.deleteMany({ projectId });

  // Then delete the project
  await foundProject.deleteOne();

  return { message: "Project and its tasks deleted successfully" };
};


export const updateProject = async (
  projectId: string,
  userId: string,
  projectName: string
) => {
  const updatedProject = await project.findOneAndUpdate(
    { _id: projectId, userId },
    { projectName },
    { new: true }
  );

  if (!updatedProject) {
    throw new Error("Project not found or permission denied");
  }

  return updatedProject;
};
