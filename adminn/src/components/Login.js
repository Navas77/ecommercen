import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

function Login({setToken}) {
    
    



    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onSubmitHandler = async (e) =>{
        try {
            e.preventDefault();
            // console.log(email,password);
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
            if(response.data.success){
              setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }
            
            
        } catch (error) {
           console.log(error);
           toast.error(error.message)
        }
       
    }
    return (
        <div className='CC6'>
            <div className='CC5'>
                <h1 className='CC4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='CC3'>
                        <p className='CC2' >Email Address</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='CC1' type="email" placeholder='your@email.com' required />
                    </div>
                    <div className='CC3'>
                        <p className='CC2' >Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='CC1' type="password" placeholder='Enter your password' required />
                    </div>
                    <button className='CC7' type='submit'>Login </button>
                </form>
            </div>
        </div>
    )
}

export default Login