import React from 'react'
import UserForm from './pages/UserForm'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'

const App = () => {
  return (
    <div className='bg-zinc-900 w-full h-screen p-10 overflow-y-auto'>
        <Routes>
          <Route path='/' element={<UserForm />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/login' element={<AdminLogin />} />
        </Routes>
    </div>
  )
}

export default App