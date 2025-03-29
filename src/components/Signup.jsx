import React,{useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from "react-router-dom"
import { login} from '../store/authSlice'
import {Button, Inputs} from './index'
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
    </div>
    </div>
  )
}

export default Signup