import React, { useContext, useEffect, useState } from 'react'
import AddTaskDialog from '../../components/AddTask/AddTaskDialog';
import { getAllTasks, markCompleted } from '../../services/end-point';
import { AppContext } from '../../context/appContext';
import './allTasks.css';

const AllTasks = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingCount, setpendingCount] = useState(0)
  const [overdueCount, setOverdueCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [tasks, settasks] = useState([]);
  const [projectData, setprojectData] = useState({});
  const { showAlert, user } = useContext(AppContext);
  const [selectedTask, setSelectedTask] = useState();
  const AddProject = () => {
    if(!openDialog){
      setOpenDialog(true);
    }else{
      setOpenDialog(false);
      setSelectedTask(null);
    }
  }

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

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const completeTask = async (task) => {
    const token = localStorage.getItem('token');
    const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
    }
    const response = await markCompleted(task._id, task.title, task.description, task.projectId._id, task.status , config);
    if(response.data.success){
        showAlert({ message: "Task Completed", type: "success", show: true })
        window.location.reload();
    }else{
        showAlert({ message: response.data.message, type: "error", show: true })
    }
  }

  
  return (
    <div style={{width:'100%'}}>
      { openDialog ? <AddTaskDialog open={openDialog} taskData={selectedTask} onClose={() => {setOpenDialog(false)}} /> : '' }
      <div className='head'>All Tasks</div>
      <div className='main-container'>
        <div className='stats'> 
          <div className='left-stat'>
            <div className='stat-wrap'>
              Pending: <span>{pendingCount}</span>
            </div>
            <div className='stat-wrap'>
              Completed: <span>{completedCount}</span>
            </div>
            <div className='stat-wrap'>
              Overdue: <span>{overdueCount}</span>
            </div>
          </div>

          <div className='right-stat'>
            <div className='btn btn-primary' onClick={AddProject}>Add Task</div> 
          </div>
        </div>
        <div className='cards-wrapper'>
          {
            tasks.length ? 

              tasks.map((task, index) => {
                return <div key={index} className='card-container'>
                      <div className='head-wrap'>
                        <div className='left'>
                          <div className='title'>{ task.Title}</div>
                          <div className='date'>Finish Date: {formatDate(new Date(task.completionDate))}</div>
                        </div>
                        <div className='right'>
                          <div className={'status ' + ( task.status === 'completed' ? 'green' : task.status === 'pending' ?  (new Date(task.completionDate) < new Date()) ? 'red' : 'blue'  : task.status )}>
                            <div className='dot'></div>
                            {
                              task.status === 'completed' ? 'completed' : 

                              task.status === 'pending' ?
                                (new Date(task.completionDate) < new Date()) ? 'overdue' : 'pending'
                               : task.status
                            }
                          </div>
                        </div>
                      </div>
                      <div className='descp'> {task.Description}</div>
                      {
                        task.status === 'completed' ?  
                          <div className='btn btn-secondary w-100'>Completed</div>
                        : <div className='btm'>
                            <div className='btn btn-success' onClick={() => completeTask(task)}>Mark Completed</div>
                            <div className='p'><i className='ph ph-pencil-simple'></i> <i className='ph ph-trash-simple'></i> </div>
                        </div>
                      }
                      
                  </div>
              })
                

            : 'No Task Added Yet'
          }
        </div>
      </div>
    </div>
  )
}

export default AllTasks