import React from 'react'
import { Link } from 'react-router-dom'
import { LuUser,LuMessageCircle,LuCircleDot,LuLayoutDashboard,LuShield,LuUsers} from 'react-icons/lu'
import {FaHome} from 'react-icons/fa'
import './css/navbar.css'

const Navbar = () => {
    return (
        <div className='h-16 bg-[#F6F4F1] border-b-[1px] border-[#E6E2DC] w-full top-0 fixed p-4 left-0'>
            <nav className='flex justify-between items-center'>
            <h1>Navbar</h1>
            <ul className='flex gap-5'> 
                <li className='flex items-center gap-2'><LuLayoutDashboard/><Link to="/">Home</Link></li>
                <li className='flex items-center gap-2'><LuMessageCircle/><Link to="/voices">Voices</Link></li>
                <li className='flex items-center gap-2'><LuCircleDot/>Circles</li>
                <li className='flex items-center gap-2'><LuShield/>My Space</li>
                <li className='flex items-center gap-2'><LuUser/>Profile</li>
                
            </ul>
            </nav>
        </div>
    )
}

export default Navbar