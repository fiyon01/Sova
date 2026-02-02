import React, { useState } from 'react'
import { LuSlidersHorizontal, LuEyeOff, LuHeartOff } from 'react-icons/lu'
import { FaGoogle, FaFacebook, FaGithub, FaEye } from 'react-icons/fa'
import "../../components/css/authsignup.css"
import axios from "axios"

const stepsConfig = [
  { id: 1, label: "Begin" },
  { id: 2, label: "Identity" },
  { id: 3, label: "Preferences" },
  { id: 4, label: "Complete" },
];

const AuthSignup = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const nextStep = () => { if (step < 4) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };
  const goToStep = (target) => { if (target <= step) setStep(target); };

  const stepDescription = {
    1: "Let’s start with the basics.",
    2: "Choose how you want to exist here.",
    3: "Set what feels safe and comfortable.",
    4: "Your space is ready.",
  };

  const buttonText = {
    1: "Continue",
    2: "Continue",
    3: "Finish setup",
    4: "Enter your space",
  };

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        email, password, name, avatar, selectedOption, selectedOption2
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    // 1. Changed h-screen to min-h-screen and added py-10 for mobile breathing room
    <div className='min-h-screen w-full bg-[#F6F4F1] flex justify-center items-center p-4 md:p-6'>
      
      {/* 2. Changed to flex-col on mobile, flex-row on md+ */}
      <div className='flex flex-col md:flex-row gap-6 max-w-4xl w-full bg-[#F6F4F1] p-4 md:p-8 rounded-2xl shadow-xl shadow-[#E6E2DC]'>
        
        {/* LEFT SECTION - Now hidden on small screens, looks better on tablet/desktop */}
        <div className='left-div flex-1 hidden md:flex flex-col justify-center bg-[#F6F4F1]/50 p-6 rounded-xl shadow-inner backdrop-blur-md'>
          <h1 className='text-2xl font-bold mb-4 text-[#1C1C1C]'>
            A quiet place to be yourself
          </h1>
          <p className='text-md text-[#727C88] mb-6 leading-relaxed'>
            SOVA is a calm space to share thoughts, sit with others,
            or simply write for yourself — without judgment.
          </p>
          <ul className='space-y-4 text-md text-[#727C88]'>
            <li className='flex items-center gap-3'>
              <LuSlidersHorizontal className='text-[#6C8E80]' size={24} />
              You’re in control of what you share
            </li>
            <li className='flex items-center gap-3'>
              <LuEyeOff className='text-[#6C8E80]' size={22} />
              Anonymous by default
            </li>
            <li className='flex items-center gap-3'>
              <LuHeartOff className='text-[#6C8E80]' size={22} />
              No likes. No pressure.
            </li>
          </ul>
        </div>

        {/* DIVIDER - Hidden on mobile */}
        <div className='signup-divider opacity-25 hidden md:block w-[1px] bg-[#E6E2DC]'></div>

        {/* RIGHT SECTION - The Form */}
        <div className="flex-1 w-full  p-4 md:p-0">
          <h1 className="text-2xl font-bold mb-1 text-[#1C1C1C]">
            Create your space
          </h1>
          <p className="text-sm md:text-md text-[#727C88] mb-6">
            Take a breath. This only takes a moment.
          </p>

          {/* STEP INDICATOR - Improved mobile touch targets */}
          <div className="flex items-center justify-between mb-4 gap-1 md:gap-2">
            {stepsConfig.map((s) => {
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => goToStep(s.id)}
                  className={`flex-1 py-2 px-1 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all
                    ${isActive ? "bg-[#6C8E80] text-white shadow-md" : 
                      isCompleted ? "bg-[#D6E5DD] text-[#1C1C1C]" : "bg-[#E6E2DC] text-[#727C88]"}
                  `}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-center text-[#727C88] mb-6 italic">
            Step {step} of 4 — {stepDescription[step]}
          </p>

          {/* STEP CONTENT */}
          <div className="w-full">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-[#1C1C1C]">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E6E2DC] rounded-lg focus:ring-2 focus:ring-[#6C8E80] outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-[#1C1C1C]">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E6E2DC] rounded-lg focus:ring-2 focus:ring-[#6C8E80] outline-none bg-white"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-[#6C8E80] text-white py-3 rounded-lg hover:bg-[#5C7D70] transition font-medium"
                >
                  {buttonText[step]}
                </button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#E6E2DC] right-div"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#F6F4F1] px-2 text-[#727C88]">Or signup with</span></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 border border-[#E6E2DC] bg-white text-[#1C1C1C] py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-[#F6F4F1] transition">
                    <FaGoogle className="text-red-500" /> Google
                  </button>
                  <button className="flex-1 border border-[#E6E2DC] bg-white text-[#1C1C1C] py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-[#F6F4F1] transition">
                    <FaFacebook className="text-blue-600" /> Facebook
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-[#1C1C1C]">Username</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="How should we call you?"
                    className="w-full px-3 py-2 border border-[#E6E2DC] rounded-lg focus:ring-2 focus:ring-[#6C8E80] outline-none bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-[#6C8E80] text-white py-3 rounded-lg hover:bg-[#5C7D70] transition"
                >
                  {buttonText[step]}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#1C1C1C]">Privacy Preference</p>
                  {/* Grid for mobile options to prevent overflow */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Just for me", "Shared anonymously", "I’ll choose every time"].map((opt) => (
                      <div 
                        key={opt}
                        className={`px-3 py-2 rounded-lg border text-sm text-center cursor-pointer transition
                          ${selectedOption === opt ? "bg-[#6C8E80] text-white border-[#6C8E80]" : "bg-white text-[#1C1C1C] border-[#E6E2DC]"}
                        `}
                        onClick={() => setSelectedOption(opt)}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#1C1C1C]">Interaction Preference</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Support only", "Allow responses", "No responses"].map((opt) => (
                      <div 
                        key={opt}
                        className={`px-3 py-2 rounded-lg border text-sm text-center cursor-pointer transition
                          ${selectedOption2 === opt ? "bg-[#6C8E80] text-white border-[#6C8E80]" : "bg-white text-[#1C1C1C] border-[#E6E2DC]"}
                        `}
                        onClick={() => setSelectedOption2(opt)}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-[#6C8E80] text-white py-3 rounded-lg hover:bg-[#5C7D70] transition"
                >
                  {buttonText[step]}
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-6 py-4">
                <div className="bg-[#D6E5DD] p-4 rounded-xl">
                    <p className="text-md text-[#1C1C1C] font-medium">Ready when you are.</p>
                    <p className="text-sm text-[#727C88] mt-1">Your space is secured and private.</p>
                </div>
                <button
                  type="button"
                  className="w-full bg-[#6C8E80] text-white py-3 rounded-lg hover:bg-[#5C7D70] transition shadow-lg"
                  onClick={handleSignup}
                >
                  {buttonText[step]} 
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthSignup