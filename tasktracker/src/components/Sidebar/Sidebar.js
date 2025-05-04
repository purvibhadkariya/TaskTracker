import React, { useContext, useEffect } from 'react'
import './Sidebar.css'
import { userDetails } from '../../services/end-point';
import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { updateUser,logOut } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() =>{
    const token = localStorage.getItem('token');
    if(token){
        const getUserDetails = async () =>{
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
            const response = await userDetails(config);
            if (response.data.success === true) {
                updateUser(response.data.data);
            } else {
                logOut();
            }
        }
        getUserDetails()
    }else{
      navigate('/login')
    }
},[])

const signOut = () =>{
  logOut();
  navigate('/login')
}
  
  return (
    <div className='main-wrap'>
        <div className='top-items'>
            <div className='title'>TaskTracker</div>
            <div className='routes'>
                <a href='/dashboard' className='item active'> Home Page </a>
                <a href='/dashboard/all-tasks' className='item'> All Tasks </a>
                <a href='/dashboard/view-completed' className='item'>View Completed</a>
            </div>
        </div>
        <div className='bottom'>
            <div className='center'><i className='ph ph-user-circle'></i> Profile</div>
            <div className='center' onClick={() => signOut()}><i className='ph ph-sign-out'></i> Sign Out</div>
        </div>
    </div>
  )
}

export default Sidebar