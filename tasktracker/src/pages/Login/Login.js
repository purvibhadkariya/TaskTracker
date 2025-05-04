import React, { useContext, useEffect, useState } from 'react'
import './login.css'
import { AppContext } from '../../context/appContext'
import { login } from '../../services/end-point';
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const { showAlert,updateUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
		email: '',
    password: ''
	});
  const [btnClick, setbtnClick] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
      if(token){
          navigate('/dashboard')
      }
  },[])

  const Login = async (e) => {
      e.preventDefault()
      setbtnClick(true);
      if(formData.email && formData.password){
          const response = await login({emailId: formData.email, password: formData.password});
          if(response.data.success){
            updateUser({...response.data.data, token: response.data.data.token});
            showAlert({ message: `Login Success`, type: "success", show: true })
            navigate('/dashboard')
          }
      }
  }

  const storeInputValue = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })



  return (
    <div className="login-wrap">
      <div className="background"></div>
      {/* <div className="todo-text">Task Tracker</div> */}

      <div className="form-container">
        <h2>Login Form</h2>
        <form onSubmit={Login}>
          <div className="">
            <label for="validationServer01" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={
                "form-control " +
                (!formData.email.length && btnClick ? "is-invalid" : "")
              }
              name="email"
              onChange={storeInputValue}
              id="validationServer01"
              required
            />
            {!formData.email.length && btnClick && (
              <div className="invalid-feedback">This field is mandatory</div>
            )}
          </div>
          <div className="">
            <label for="validationServer01" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={
                "form-control " +
                (!formData.password.length && btnClick ? "is-invalid" : "")
              }
              name="password"
              onChange={storeInputValue}
              id="validationServer02"
              required
            />
            {!formData.password.length && btnClick && (
              <div className="invalid-feedback">Invalid Password</div>
            )}
          </div>
          <div className="mt-4">
            <button className="btn btn-primary" type="submit">
              Submit form
            </button>
          </div>
        </form>
        <div className="mt-3 text-center">
          <p>
            Don't have an account? <Link to="/signup">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login