import React, { useContext, useState } from 'react'
import './Signup.css';
import { AppContext } from '../../context/appContext';
import { signup } from '../../services/end-point';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { showAlert, updateUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
		emailId: '',
    country: '',
    userName:'',
    password: ''
	})

  const navigate = useNavigate();

  const Submit = async (e) => {
      e.preventDefault()
      if(formData.emailId && formData.password && formData.country && formData.userName){
          const response = await signup({emailId: formData.emailId, password: formData.password, userName: formData.userName, country: formData.country});
          if(response.data.success){
            updateUser({...response.data.data, token: response.data.data.token});
            showAlert({ message: `Login Success`, type: "success", show: true })
            navigate('/dashboard')
          }
      }
  }

  const storeInputValue = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })



  return (
    <div className='login-wrap'>
      <div class="background"></div>
        {/* <div class="todo-text">Task Tracker</div> */}

        <div class="form-container">
            <h2>Signup Form</h2> 
            <form onSubmit={Submit}>
              <div class="">
                <label for="validationServer01" class="form-label">User Name</label>
                <input type="text" class="form-control is-invalid" name='userName' onChange={storeInputValue} id="validationServer01" required/>
                <div class="invalid-feedback">
                  Mandetory to fill
                </div>
              </div>
              <div class="">
                <label for="validationServer01" class="form-label">Country</label>
                <input type="text" class="form-control is-invalid" name='country' onChange={storeInputValue}  id="validationServer02" required/>
                <div class="invalid-feedback">
                  Mandetory to fill
                </div>
              </div>
              <div class="">
                <label for="validationServer01" class="form-label">Email</label>
                <input type="text" class="form-control is-invalid" name='emailId' onChange={storeInputValue}  id="validationServer03" required/>
                <div class="invalid-feedback">
                  Mandetory to fill
                </div>
              </div>
              <div class="">
                <label for="validationServer01" class="form-label">Password</label>
                <input type="text" class="form-control is-invalid" name='password' onChange={storeInputValue}  id="validationServer04" required/>
                <div class="invalid-feedback">
                  Mandetory to fill
                </div>
              </div>
              <div class="col-12">
                <button class="btn btn-primary" type="submit">Submit form</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Signup