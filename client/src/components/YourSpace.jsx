import React from 'react'
import '../components/css/yourspace.css'

const YourSpace = () => {
  return (
    <div className='your-space mt-4 bg-[#ffffff] rounded-md p-4 w-full'>
        <h1 className=''>This Week's journey</h1>
        <div className='w-full h-[1px] bg-[#E6E2DC] mt-2 mb-2'></div>
        <div className='flex justify-between'>
             <div className='flex flex-col gap-2'>
             <ul >
                <li>Feeling sad on Monday</li>
                <li>Feeling happy on Tuesday</li>
                <li>Feeeling neutral on wednesday</li>
             </ul>
        </div>
        <div className='w-[1px] h-24 bg-[#E6E2DC] mt-2 mb-2'></div>

        <div>
            <h1>Trend</h1>
           <p className='text-[#727C88]'>You checked in 4 days this week</p>

        </div>
        </div>
       
        <div>
            <button className='mt-2 bg-[#6C8E80] text-[#ffffff] py-1 px-2 rounded-md cursor-pointer hover:bg-[#727C88] transition all 0.3s ease-in-out '>Go to Your Space</button>
        </div>
    </div>
  )
}

export default YourSpace