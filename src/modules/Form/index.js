import React, { useState } from 'react';
import Input from '../../Components/Inputs/index';
import Buttons from '../../Components/Buttons';

const Form = ({
  isSignPage = false
}) => {

  const [data, setData] = useState({
    ...(!isSignPage && {
      fullName: ''
    }),
    email: '',
    password: ''
  })
  console.log("data => ", data)

  return (
    <div className=" bg-white w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
      <div className=' text-4xl font-extrabold '>Welcome {isSignPage && 'Back'}</div>
      <div className=' text-4xl font-light mb-14'>{isSignPage ? 'Sign in to get explored' : 'Signup to get started'}</div>

      <form className=' flex flex-col items-center w-full' onSubmit={()=>console.log("Submited")}>
        {!isSignPage && <Input label="Full name" name="name" placeholder="Enter your full name" className="mb-6" value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} />}
        <Input label="Email Address" type='email' name="email" placeholder="Enter your name" className="mb-6" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        <Input label="Password" type="password" name="password" placeholder="Enter your password" className="mb-14" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
        <Buttons label={isSignPage ? 'Sign in' : 'Sign up'} type='submit' className="w-1/2 mb-2" />
      </form>

      <div>{isSignPage ? "Didn'nt have account" : "Already have an account?"} <span className=' text-primary cursor-pointer underline'>{isSignPage ? 'Sign up' : 'Sign in'}</span></div>
    </div>
  )
}

export default Form