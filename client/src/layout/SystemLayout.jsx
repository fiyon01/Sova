import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../components/css/main.css'

const SystemLayout = () => {
  return (
    <div className='flex flex-row'>
        <Navbar />
        <main className='flex-1'>
            <Outlet />
        </main>
    </div>
  )
}

export default SystemLayout