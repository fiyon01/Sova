import React, { useState } from 'react'
import { LuSlidersHorizontal,LuEyeOff,LuHeartOff } from 'react-icons/lu'
import { FaGoogle, FaFacebook, FaGithub,FaEye } from 'react-icons/fa'
import  "../../components/css/authsignup.css"
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

    const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const goToStep = (target) => {
    if (target <= step) setStep(target); // allow back navigation
  };

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

  const handleSignup = async() => {
    console.log("Signup")
    try {

        const response = await axios.post("http://localhost:5000/api/auth/signup", {
            email,
            password,
            name,
            avatar,
            selectedOption,
            selectedOption2
        })
      
    } catch (error) {
      
    }
    
  }

  return (
    <div className='flex justify-center items-center w-full h-screen bg-[#F6F4F1] overflow-x-hidden'>
  <div className='flex gap-6 max-w-4xl w-full bg-[#F6F4F1] p-6 rounded-xl shadow-xl shadow-[#E6E2DC] backdrop-blur-sm'>
    
    {/* LEFT */}
    <div className='left-div flex-1 hidden md:block bg-[#F6F4F1]/50 p-6 rounded-xl shadow-xl shadow-[#E6E2DC] backdrop-blur-md '>
      <h1 className='text-2xl font-bold mb-4 text-[#1C1C1C] text-center'>
        A quiet place to be yourself
      </h1>

      <p className='text-md text-[#727C88] mb-4'>
        SOVA is a calm space to share thoughts, sit with others,
        or simply write for yourself — without judgment.
      </p>

      <ul className='space-y-3 text-md text-[#727C88]'>
        <li className='flex items-center gap-2'>
          <LuSlidersHorizontal className='text-[#6C8E80]' size={24} />
          You’re in control of what you share
        </li>
        <li className='flex items-center gap-2'>
          <LuEyeOff className='text-[#6C8E80]' size={22} />
          Anonymous by default
        </li>
        <li className='flex items-center gap-2'>
          <LuHeartOff className='text-[#6C8E80]' size={22} />
          No likes. No pressure.
        </li>
      </ul>
    </div>

    {/* DIVIDER */}
    <div className='signup-divider opacity-25 hidden md:block'></div>

    {/* RIGHT */}
    <div className="flex-1 p-6 right-div rounded-xl shadow-xl shadow-[#E6E2DC] backdrop-blur-md">
      <h1 className="text-2xl font-bold mb-1 text-[#1C1C1C]">
        Create your space
      </h1>
      <p className="right-p text-md text-[#727C88] mb-4">
        Take a breath. This only takes a moment.
      </p>

      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between mb-3 gap-2">
        {stepsConfig.map((s, index) => {
          const isActive = step === s.id;
          const isCompleted = step > s.id;

          return (
            <button
              key={s.id}
              onClick={() => goToStep(s.id)}
              className={`
                flex-1 py-2 px-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-[#6C8E80] text-white shadow-md scale-[1.03]"
                    : isCompleted
                    ? "bg-[#D6E5DD] text-[#1C1C1C]"
                    : "bg-[#E6E2DC] text-[#727C88]"
                }
              `}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* STEP HELPER TEXT */}
      <p className="text-sm text-center text-[#727C88] mb-6">
        Step {step} of 4 — {stepDescription[step]}
      </p>

      {/* STEP CONTENT */}
      {step === 1 && (
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-[#E6E2DC] rounded-md focus:ring-2 focus:ring-[#6C8E80] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-[#E6E2DC] rounded-md focus:ring-2 focus:ring-[#6C8E80] outline-none"
            />
          </div>

          <button
            type="button"
            onClick={nextStep}
            className="w-full bg-[#6C8E80] text-white py-2 rounded-md hover:bg-[#5C7D70] transition"
          >
            {buttonText[step]}
          </button>

          {/* SOCIAL LOGIN */}
          <div className="mt-4">
            <div className="h-[1px] bg-[#E6E2DC] mb-3" />
            <p className="text-sm text-center text-[#727C88] mb-3">
              Or signup with
            </p>
            <div className="flex gap-3">
              <button className="flex-1 bg-[#6C8E80] text-white py-2 rounded-md flex justify-center items-center gap-2">
                <FaGoogle /> Google
              </button>
              <button className="flex-1 bg-[#6C8E80] text-white py-2 rounded-md flex justify-center items-center gap-2">
                <FaFacebook /> Facebook
              </button>
            </div>
          </div>
        </form>
      )}

      {step === 2 && (
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-[#E6E2DC] rounded-md focus:ring-2 focus:ring-[#6C8E80] outline-none"
            />
          </div>

          <button
            type="button"
            onClick={nextStep}
            className="w-full bg-[#6C8E80] text-white py-2 rounded-md hover:bg-[#5C7D70]"
          >
            {buttonText[step]}
          </button>
        </form>
      )}

      {step === 3 && (
        <form className="space-y-4">
          <p className="text-sm text-[#727C88]">When you write, who should see it?</p>
          <div className="flex items-center gap-2">
            <p className="flex-1  text-[#1C1C1C] border border-[#E6E2DC] py-2 rounded-md text-center cursor-pointer" onClick={() => setSelectedOption("Just for me")} style={{backgroundColor: selectedOption === "Just for me" ? "#6C8E80" : "#F6F4F1", color: selectedOption === "Just for me" ? "#F6F4F1" : "#1C1C1C"}}>Just for me</p>
            <p className="flex-1  text-[#1C1C1C] border border-[#E6E2DC] py-2 rounded-md text-center cursor-pointer" onClick={() => setSelectedOption("Shared anonymously")} style={{backgroundColor: selectedOption === "Shared anonymously" ? "#6C8E80" : "#F6F4F1", color: selectedOption === "Shared anonymously" ? "#F6F4F1" : "#1C1C1C"}}>Shared anonymously</p>
            <p className="flex-1  text-[#1C1C1C] border border-[#E6E2DC] py-2 rounded-md text-center cursor-pointer" onClick={() => setSelectedOption("I’ll choose every time")} style={{backgroundColor: selectedOption === "I’ll choose every time" ? "#6C8E80" : "#F6F4F1", color: selectedOption === "I’ll choose every time" ? "#F6F4F1" : "#1C1C1C"}}>I’ll choose every time</p>
          </div>

          <p className="text-sm text-[#727C88]">You can change this anytime per post.</p>
          <div className="signup-divider my-3" />
          <p className="text-sm text-[#727C88]">How should others respond to you?</p>
          <div className="flex items-center gap-2">
            <p className="flex-1  text-[#1C1C1C] border border-[#E6E2DC] py-2 rounded-md text-center cursor-pointer" onClick={() => setSelectedOption2("Support only")} style={{backgroundColor: selectedOption2 === "Support only" ? "#6C8E80" : "#F6F4F1", color: selectedOption2 === "Support only" ? "#F6F4F1" : "#1C1C1C"}}>Support only</p>
            <p className="flex-1  text-[#1C1C1C] border border-[#E6E2DC] py-2 rounded-md text-center cursor-pointer" onClick={() => setSelectedOption2("Allow responses")} style={{backgroundColor: selectedOption2 === "Allow responses" ? "#6C8E80" : "#F6F4F1", color: selectedOption2 === "Allow responses" ? "#F6F4F1" : "#1C1C1C"}}>Allow responses</p>
            <p className="flex-1  text-[#1C1C1C] border border-[#E6E2DC] py-2 rounded-md text-center cursor-pointer" onClick={() => setSelectedOption2("No responses")} style={{backgroundColor: selectedOption2 === "No responses" ? "#6C8E80" : "#F6F4F1", color: selectedOption2 === "No responses" ? "#F6F4F1" : "#1C1C1C"}}>No responses</p>
          </div>
       <p className="text-sm text-[#727C88]">There are no likes or scores here.</p>
       <div className="signup-divider my-3" />

          <button
            type="button"
            onClick={nextStep}
            className="w-full bg-[#6C8E80] text-white py-2 rounded-md hover:bg-[#5C7D70]"
          >
            {buttonText[step]}
          </button>
        </form>
      )}

      {step === 4 && (
        <div className="text-center space-y-4">
          <p className="text-md text-[#727C88]">
            Your space is ready. You’re in control.
          </p>

          <button
            type="button"
            className="w-full bg-[#6C8E80] text-white py-2 rounded-md hover:bg-[#5C7D70]" onClick={handleSignup}
          >
            {buttonText[step]} 
          </button>
        </div>
      )}
    </div>
  </div>
  
</div>

  )
}

export default AuthSignup