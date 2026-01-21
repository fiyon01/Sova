import React, { useState } from "react";
import "../components/css/voices.css";
import {
  LuHeart,
  LuClock,
  LuPenLine,
  LuEllipsis,
  LuPlus
} from "react-icons/lu";
import CreateVoiceModal from "../components/CreateVoiceModal";

const Voices = () => {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#F6F4F1] pt-16 overflow-x-hidden voices">
      
      {/* Header */}
      <div className="flex flex-col items-center mt-6 gap-1 text-center">
        <h1>You are not alone</h1>
        <p>Read, sit with, or share gently</p>

        {/* Create Button */}
        <button
          onClick={() => setOpenCreate(true)}
          className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full
          bg-[#6C8E80] text-white text-sm
          hover:scale-[1.02] active:scale-95 transition"
        >
          <LuPlus className="w-4 h-4" />
          Create a Voice
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-center mt-6">
        <div className="flex gap-2 border border-[#E6E2DC] rounded-full p-2 bg-white">
          {["Vent", "Seeking Support", "Positivity"].map((tag) => (
            <div
              key={tag}
              className="voices-item px-4 py-1"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Voices Feed */}
      <div className="voices-container flex flex-col gap-4 items-center mt-6">
        
        {/* Voice Card */}
        <div className="bg-[#F6F4F1] w-full p-4 rounded-xl shadow-sm hover:shadow-md transition md:w-[90%]">
          
          {/* Meta */}
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <p className="text-sm text-[#1C1C1C]">Anonymous</p>
              <p className="text-sm text-[#727C88]">2 hours ago</p>
            </div>

            <button className="text-[#727C88] hover:text-[#6C8E80] transition">
              <LuEllipsis className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mt-3 md:w-[85%]">
            <p className="text-[#1C1C1C] leading-relaxed">
              I am tired of pretending to be happy. At work I hide it,
              but I can’t continue this way. I want to feel okay again.
            </p>
          </div>
          

          {/* Actions */}
          <div className="flex justify-between mt-5 text-sm">
            <Action icon={<LuHeart />} label="I hear you" />
            <Action icon={<LuClock />} label="Sit with" />
            <Action icon={<LuPenLine />} label="Respond" />
          </div>
        </div>
            {/* Voice Card */}
        <div className="bg-[#F6F4F1] w-full p-4 rounded-xl shadow-sm hover:shadow-md transition md:w-[90%]">
          
          {/* Meta */}
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <p className="text-sm text-[#1C1C1C]">Anonymous</p>
              <p className="text-sm text-[#727C88]">2 hours ago</p>
            </div>

            <button className="text-[#727C88] hover:text-[#6C8E80] transition">
              <LuEllipsis className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mt-3 md:w-[85%]">
            <p className="text-[#1C1C1C] leading-relaxed">
              I am tired of pretending to be happy. At work I hide it,
              but I can’t continue this way. I want to feel okay again.
            </p>
          </div>
          

          {/* Actions */}
          <div className="flex justify-between mt-5 text-sm">
            <Action icon={<LuHeart />} label="I hear you" />
            <Action icon={<LuClock />} label="Sit with" />
            <Action icon={<LuPenLine />} label="Respond" />
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreateVoiceModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </div>
  );
};

const Action = ({ icon, label }) => (
  <button
    className="flex items-center gap-2 px-3 py-2 rounded-lg
    bg-white border border-[#E6E2DC]
    text-[#727C88]
    hover:text-[#6C8E80] hover:border-[#6C8E80]
    transition active:scale-95"
  >
    {icon}
    {label}
  </button>
);

export default Voices;
