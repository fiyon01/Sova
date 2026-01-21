import React from 'react'
import './css/todayprompt.css'

const TodayPrompt = () => {
  return (
    <div className='today-prompt-container mt-6'>
        <h1 className=' text-center'>Today's Prompt</h1>
    <div className='today-prompt w-full bg-[#ffffff] border-b-[1px] border-[#E6E2DC] mt-4'>
        <div className='flex flex-col items-center'>
            <p className='text-lg'>What’s been weighing on you?</p>
            <div className='flex gap-4 mt-4 buttons'>
                <button className='bg-[#F6F4F1] border-[1px] border-[#E6E2DC] rounded-md p-4 gap-2 cursor-pointer'>Write Privately</button>
                <button className='bg-[#F6F4F1] border-[1px] border-[#E6E2DC] rounded-md p-4 gap-2 cursor-pointer'>Share</button>
                <button className='bg-[#F6F4F1] border-[1px] border-[#E6E2DC] rounded-md p-4  gap-2 cursor-pointer'>Skip</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default TodayPrompt