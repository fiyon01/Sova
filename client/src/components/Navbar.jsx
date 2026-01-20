import React from 'react'

const Navbar = () => {
    return (
        <div className='h-16 bg-[#F6F4F1] border-b-[1px] border-[#E6E2DC] w-full top-0 fixed font-inter p-4'>
            <nav className='flex justify-between items-center'>
            <h1>Navbar</h1>
            <ul className='flex gap-5'>
                <li>My Space</li>
                <li>Voices</li>
                <li>Circles</li>
                <li>Profile</li>
                
            </ul>
            </nav>
        </div>
    )
}

export default Navbar