import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import AddProjectDialog from "../../components/addProject/AddProjectDialog";
import {
  getProjects,
  deleteProject,
  getAllTasks,
} from "../../services/end-point";
import { AppContext } from "../../context/appContext";

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tasks, settasks] = useState([]);
  const [pendingCount, setpendingCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [selectedProject, setSelectedProject] = useState();
  const { showAlert } = useContext(AppContext);
  const [projects, setprojects] = useState([]);
  const AddProject = () => {
    if (!openDialog) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  };

  useEffect(()=> {
        // getProjectTasks
        const getTasks = async () =>{
          const token = localStorage.getItem('token');
          const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
          }
          const response = await getAllTasks(config);
          if (response.data.success === true) {
              console.log(response.data)
              settasks(response.data.data.tasks);
              setpendingCount(response.data.data.pending);
              setOverdueCount(response.data.data.overdue);
              setCompletedCount(response.data.data.completed);
  
          } else {
            showAlert({ message: `Something went Wrong`, type: "error", show: true })
          }
        }
  
        getTasks();
    },[])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getAllProjects = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await getProjects(config);
        if (response.data.success === true) {
          setprojects(response.data.data);
        } else {
          showAlert({
            message: `Something went Wrong`,
            type: "error",
            show: true,
          });
        }
      };

      getAllProjects();
    }
  }, []);

  const deleteSelectedProject = async (projectId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await deleteProject(projectId, config);
    if (response.data.success) {
      showAlert({
        message: `Project Deleted Success`,
        type: "success",
        show: true,
      });
      setprojects((current) =>
        current.filter((project) => project._id !== projectId)
      );
    } else {
      showAlert({
        message: `Failed to Delete Task`,
        type: "error",
        show: true,
      });
    }
  };

  const EditProject = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      {openDialog ? (
        <AddProjectDialog
          open={openDialog}
          projectData={selectedProject}
          onClose={() => {
            setOpenDialog(false);
          }}
        />
      ) : (
        ""
      )}
      <div className="head">All Projects</div>
      <div className="main-container">
        <div className="stats">
          <div className="left-stat">
            <div className="stat-wrap">
              Pending: <span>{pendingCount}</span>
            </div>
            <div className="stat-wrap">
              Completed: <span>{completedCount}</span>
            </div>
            <div className="stat-wrap">
              Overdue: <span>{overdueCount}</span>
            </div>
          </div>

          <div className="right-stat">
            <div className="btn btn-primary" onClick={AddProject}>
              Add Project
            </div>
          </div>
        </div>
        {projects.length ? (
          <div className="cards-wrapper">
            {projects.map((project, index) => {
              return (
                <div key={index} className="card-container">
                  <div className="title">{project.projectName}</div>
                  <div className="date">
                    Finish Date: {formatDate(new Date(project.completionDate))}
                  </div>
                  {/* <div className="date">02/03/2025</div> */}
                  <div className="btm">
                    <a
                      href={"/dashboard/project/" + project._id}
                      className="btn btn-success rounded-pill"
                    >
                      View Details
                    </a>
                    <div className="p">
                      <i
                        className="ph ph-pencil-simple"
                        onClick={() => EditProject(project)}
                      ></i>{" "}
                      <i
                        className="ph ph-trash-simple"
                        onClick={() => deleteSelectedProject(project._id)}
                      ></i>{" "}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "No Projects Added Yet"
        )}
      </div>
    </div>
  );
};

export default Home;
