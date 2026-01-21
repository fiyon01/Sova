import React from 'react'
import { motion } from 'framer-motion'
import { FaGoogle, FaFacebook, FaGithub,FaEye } from 'react-icons/fa'

const Signup = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className='flex justify-center items-center h-screen bg-[#F6F4F1]'>
        <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-lg bg-[#F6F4F1] p-4 rounded-xl border border-[#E6E2DC] shadow-xl  shadow-[#E6E2DC] backdrop-blur-sm'>
            <h1 className='text-3xl font-bold mb-4 text-[#1C1C1C]'>Signup</h1>
            <p className='text-md text-[#727C88] mb-4'>Create an account to start using Sova</p>
            <form autoComplete="off">
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Username</label>
                    <input type='text' className='w-full px-3 py-2 border border-[#E6E2DC] rounded-md outline-none focus:ring-2 focus:ring-[#6C8E80]' />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Email</label>
                    <input type='email' className='w-full px-3 py-2 border border-[#E6E2DC] rounded-md outline-none focus:ring-2 focus:ring-[#6C8E80]' />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Password</label>
                    <input type='password' className='w-full px-3 py-2 border border-[#E6E2DC] rounded-md outline-none focus:ring-2 focus:ring-[#6C8E80]' />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Confirm Password</label>
                    <input type='password' className='w-full px-3 py-2 border border-[#E6E2DC] rounded-md outline-none focus:ring-2 focus:ring-[#6C8E80]' />
                </div>
                <button type='submit' className='w-full bg-[#6C8E80] text-white py-2 rounded-md hover:bg-[#5C7D70] transition duration-300 cursor-pointer'>Signup</button>

                {/* Social Login */}
                <div className='mt-4'>
                    <div className='w-full h-[1px] bg-[#E6E2DC] mb-2'></div>
                    <p className='text-sm text-[#727C88] mb-2 text-center'>Or signup with</p>
                    <div className='flex gap-4'>
                        <button className='w-1/2 bg-[#6C8E80] text-white py-3 rounded-md flex items-center justify-center gap-2'>
                            <FaGoogle /> Google
                        </button>
                        <button className='w-1/2 bg-[#6C8E80] text-white py-3 rounded-md flex items-center justify-center gap-2'>
                            <FaFacebook /> Facebook
                        </button>
                    </div>
                </div>

                <p className='text-md text-[#727C88] mt-4'>Already have an account? <a href='/login' className='text-[#6C8E80] hover:underline'>Login</a></p>
            </form>
        </div>
    </motion.div>
  )
}

export default Signup