import React, { useContext, useEffect, useState } from 'react';
import './AddTaskDialog.css'
import { AppContext } from '../../context/appContext';
import { createTask, updateTask } from '../../services/end-point';

const AddTaskDialog = (props) => {
    const dialogRef = React.useRef(null);
    const { showAlert, user} = useContext(AppContext);
    const [formData, setFormData] = useState({
		title: '',
		description: '',
		date: null,
        status: 'Pending'
	})
    const [isbtnClick, setIsBtnClick] = useState(false);

    
    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
          if (props.open) {
            if (!dialog.open) {
              dialog.showModal();
            }
          } else {
            if (dialog.open) {
              dialog.close();
            }
          }
        }
    }, [props.open]);

    useEffect(() =>{ 
        if(props.taskData){
            console.log(props.taskData)
            setFormData({
                title:props.taskData.Title,
                description:props.taskData.Description,
                date:new Date(props.taskData.createdAt),
            })

            console.log(props.taskData.createdAt)
        }
    },[])

    const AddTask = async (e) => {
        e.preventDefault()
        setIsBtnClick(true);
        if(formData.title && formData.description && formData.date){
            const token = localStorage.getItem('token');
            const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
            }
            if(props.taskData){
                const response = await updateTask(props.taskData._id, formData.title, formData.description, formData.date, props.projectId, props.taskData.status , config);
                if(response.data.success){
                    showAlert({ message: "Task Updated Success", type: "success", show: true })
                    window.location.reload();
                }else{
                    showAlert({ message: response.data.message, type: "error", show: true })
                }
            }else{
                const response = await createTask(formData.title, formData.description, formData.date, props.projectId, config);
                if(response.data.success){
                    showAlert({ message: "Task Added Success", type: "success", show: true })
                    window.location.reload();
                }else{
                    showAlert({ message: response.data.message, type: "error", show: true })
                }
            }
        }
    }

	const storeInputValue = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })
    

    return(
        <dialog className='dialog-main-container' ref={dialogRef}>
            <form className='form-wrap' onSubmit={(e) => AddTask(e)}>
                <i className='ph ph-x close' onClick={props.onClose}></i>

                <div className="head-section title">
                    Create New Task
                </div>

                <div className="dialog-content">
                    <label htmlFor="validationServer01" className="form-label mt-2">Title</label>
                    <input type="text" name='title' className={"form-control "+ (!formData.title.length && isbtnClick ? 'is-invalid':'')} value={formData.title} id="validationServer01" onChange={storeInputValue} required/>
                    {
                        (!formData.title.length && isbtnClick)  && <div className="invalid-feedback">
                        This field is mandatory
                        </div>
                    }
                    
                    <label htmlFor="validationServer01" className="form-label mt-2">Description</label>
                    <textarea class={"form-control "+ (!formData.description.length && isbtnClick ? 'is-invalid':'')}  name='description' value={formData.description}  id="validationServer01" rows="3" onChange={storeInputValue} required></textarea>
                    {
                        (!formData.description.length && isbtnClick)  && <div className="invalid-feedback">
                        This field is mandatory
                        </div>
                    }
                    <label htmlFor="validationServer01" className="form-label mt-2">Date</label>
                    <input type="date" className={"form-control "+ (!formData.date && isbtnClick ? 'is-invalid':'')}  value={formData.date}   name='date' id="validationServer01" onChange={storeInputValue} required/>
                    {
                        (!formData.date && isbtnClick) && <div className="invalid-feedback">
                        This field is mandatory
                        </div>
                    }
                </div>

                <div className="footer-section">
                    <button type='submit' className='btn btn-secondary w-100'>Add Task</button>
                </div>
            </form>

        </dialog>
    )
}

export default AddTaskDialog