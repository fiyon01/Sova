import React from 'react'
import './css/dailycheckin.css'

const DailyCheckin = () => {
  return (
    <div className='daily-checkin-container'>
        <div className='flex flex-col items-center mb-2'  >
    <h1 className='text-2xl font-bold py-2'>How are you feeling today?</h1>
     <p className='text-lg'>Take a moment to check-in</p>
    </div>
    <div className='daily-checkin w-full bg-[#ffffff] border-b-[1px] border-[#E6E2DC]'>
        <div className='flex flex-col items-center gap-4 p-4'>
            <div>
            <div className='flex gap-4 mt-4 buttons'>
                <button className='bg-[#F6F4F1] border-[1px] border-[#E6E2DC] rounded-md px-4 py-2 gap-2'>😐Happy</button>
                <button className='bg-[#F6F4F1] border-[1px] border-[#E6E2DC] rounded-md px-4 py-2 gap-2'>😔Sad</button>
                <button className='bg-[#F6F4F1] border-[1px] border-[#E6E2DC] rounded-md px-4 py-2 gap-2'>😣Angry</button>
                <button className='bg-[#F6F4F1] border-[1px] border-[#E6E2DC] rounded-md px-4 py-2 gap-2'>😔Neutral</button>
            </div>
            </div>
            <div className=''>
                <button className='bg-[#6C8E80] text-[#ffffff] border-[1px] border-[#E6E2DC] rounded-md px-4 py-2 cursor-pointer'>Check-in</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default DailyCheckin