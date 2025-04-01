import React,{useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from "react-router-dom"
import { login} from '../store/authSlice'
import {Button, Input} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const[error, setError] = useState('')
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) =>{
        setError('')
        try {
        const userData = await authService.createAccount(data)
        if(userData){
         const userData = await authService.getCurrentUser()
         if(userData)dispatch(login(userData));
         navigate('/')
        }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div>
         <div
    className='flex items-center justify-center w-full'>
<div className={`mx-auto w-full max-w-lg bg-gray-100
    rounded-xl p-10 border border-black/10`}></div>
    <h2 className='text-center text-2xl font-bold
    leading-tight'>Sign in to your account</h2>
    <p  className='mt-2 text-center text-base text-black/60'>
         
         Don&apos;t have any account?&nbsp;
         <Link
         to='signup'
         className='font-medium text-primary
         transition-all duration-200
         hover:underline'>
            Sign Up
         </Link>
    </p>
    {error && <p className='text-red-600 mt-8
    text-center'>{error}</p>}
    <form onSubmit={handleSubmit(create)}>
      <div  className='space-y-5'>
        <input
        label="Full Name"
        placeholder='Enter your name'
        {...register('name',{
          required: true,
        })}
        />
        <input
      label="Email:"
      placeholder='Enter your email'
      type='email'
      {...register('email', {
        required: true,
        validate:{
            matchPatern: (value)=> /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.
            test(value) || 
            "Email address must be a valid address",
        }
      })}
      />
        <input
      label='Password:'
      placeholder='Enter your password'
      type='password'
      {...register('password',{
        required: true,
        validate:{
            matchPatern: (value)=> /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.
            test(value) || 
            "please enter storng password"
        }
      }
      )}
      />
      <Button
      type="submit"
      className='w-full'
      > Create Account</Button>
      </div>
    </form>
    </div>
    </div>
  )
}

export default Signup