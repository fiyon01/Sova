import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'
import DailyCheckin from '../components/DailyCheckin'
import TodayPrompt from '../components/TodayPrompt'
import YourSpace from '../components/YourSpace'
import AvatarModal from '../components/AvatarModal'

import '../components/css/home.css'

import { LuPenLine,LuClock,LuHeart,LuUsers } from 'react-icons/lu'  
import { io } from "socket.io-client";


const Home = () => {
    const [reactions, setReactions] = useState([]);
    const [isOpen,setIsOpen] = useState(false);
    const {isNewUser} = useLocation().state || {isNewUser:false};
    

    // FIX: Use useEffect to trigger the modal once on mount
    useEffect(() => {
        if (isNewUser) {
            setIsOpen(true);
        }
    }, [isNewUser]); // Only runs when isNewUser changes
    
    useEffect(() => {
       
        const socket = io("http://192.168.100.2:3000");


        //listen for events
        socket.on("reactions", (data) => {
            setReactions(data);
        });

        socket.on("connect", () => { 
            console.log("Connected to server with id: ", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

  return (
    <div className="min-h-screen w-full bg-[#F6F4F1] pt-16 overflow-y-auto">
      <Navbar />

      {/* MAIN WRAPPER */}
      <div className="w-full px-4 md:px-6 flex flex-col md:flex-row gap-4">

        {/* LEFT COLUMN */}
        <div className="w-full md:w-[65%] flex flex-col items mt-4">
          <DailyCheckin />

          <div className="mt-4 w-full h-[1px] bg-[#E6E2DC]" />

          <TodayPrompt />

          <div className="mt-4 w-full h-[1px] bg-[#E6E2DC]" />

          <YourSpace />
        </div>

        {/* RIGHT COLUMN */}
        <div className="hidden md:flex md:w-[35%] flex-col circles-container mt-4">

          {/* HEADER */}
          <div className="flex flex-col items-start">
            <h1 className="text-lg font-semibold">Circles</h1>
            <p className="text-sm text-[#727C88]">Shared Experiences</p>
          </div>

          {/* CARD */}
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="bg-white w-full mt-3 p-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <p className="text-sm text-[#1C1C1C]">Anonymous</p>
                  <p className="text-[#727C88] text-sm">2 hours ago</p>
                </div>

                <p className="text-xs text-white bg-[#727C88] px-2 py-1 rounded-md">
                  Vent
                </p>
              </div>

              <h2 className="text-[#1C1C1C] text-md mt-2">
                I am tired of pretending to be happy
              </h2>

              <ul className="flex justify-between text-[#727C88] mt-4 text-sm">
                <div className='flex flex-row gap-2 items-center cursor-pointer hover:text-[#6C8E80] transition-all duration-300'><LuHeart /> I hear you</div>
                <div className='flex flex-row gap-2 items-center cursor-pointer hover:text-[#6C8E80] transition-all duration-300'><LuClock /> Sit with</div>
                <div className='flex flex-row gap-2 items-center cursor-pointer hover:text-[#6C8E80] transition-all duration-300'><LuPenLine /> Respond</div>
              </ul>
            </div>
          ))}

          <div className="w-full h-[1px] bg-[#E6E2DC] my-6" />

          {/* CTA */}
          <div className="bg-[#E6DCCF] w-full p-4 rounded-md flex flex-col items-center gap-4">
            <p className="text-[#1C1C1C] text-sm font-medium text-center">
              You can visit the Voices page when you are ready
            </p>

            <button className="bg-[#6C8E80] text-white rounded-md px-4 py-2 hover:opacity-90 transition">
              Go To Voices
            </button>
          </div>
        </div>
      </div>
      <AvatarModal/>
    </div>
  )
}

export default Home
