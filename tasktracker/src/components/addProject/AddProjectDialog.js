import React, { useContext, useEffect, useState } from 'react';
import './AddProjectDialog.css'
import { addProject } from '../../services/end-point';
import { AppContext } from '../../context/appContext';

const AddProjectDialog = (props) => {
    const { showAlert } = useContext(AppContext);
    const [validProject, setvalidProject] = useState(true);
    const dialogRef = React.useRef(null);const [formData, setFormData] = useState({
      project: '',
    })
    
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

    const storeInputValue = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value })
      if(event.target.value){
        setvalidProject(true);
      }else{
        setvalidProject(false);
      }
    }

    const AddProject = async () => {
      if(formData.project){
        const token = localStorage.getItem('token');
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
        }
        const response = await addProject({projectName: formData.project}, config);
        if(response.data.success){
          showAlert({ message: "Project Added Success", type: "success", show: true })
          window.location.reload();
        }else{
          showAlert({ message: response.data.message, type: "error", show: true })
        }
      }else{
        setvalidProject(false);
      }
    }

    return(
        <dialog className='dialog-main-container-1' ref={dialogRef}>
            <i className='ph ph-x close' onClick={props.onClose}></i>

            <div className="head-section title">
                Add New Project
            </div>

            <form className='w-100'>
              <div className="dialog-content">
                  <label htmlFor="validationServer01" className="form-label">Project Name</label>
                  <input type="text" className={"form-control " + (validProject ? '' : 'is-invalid')} name='project' onChange={storeInputValue} id="validationServer01" required/>
                  {
                   ! validProject && <div className="invalid-feedback">
                            Looks good!
                          </div>
                  }
              </div>

              <div className="footer-section">
                  <div className='btn btn-secondary' onClick={AddProject}>Submit</div>
              </div>
            </form>

        </dialog>
    )
}

export default AddProjectDialog