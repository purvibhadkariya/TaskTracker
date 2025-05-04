import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home';
import Sidebar from '../components/Sidebar/Sidebar';
import './dashboard.css'
import AllTasks from '../pages/AllTasks/AllTasks';
import Completed from '../pages/Completed/Completed';
import Project from '../pages/Project/Project';

const Dashboard = () => {
  return (
    <div className='App'>
        <Sidebar />
        <div className='content'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/all-tasks' element={<AllTasks />} />
                <Route path='/view-completed' element={<Completed />} />
                <Route path='/project/:id' element={<Project />} />
            </Routes>
        </div>
    </div>
  )
}

export default Dashboard