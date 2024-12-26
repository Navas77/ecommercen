import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [currentState,setCurrentState] = useState("Login");
  const {token,setToken,navigate,backendUrl} = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')

const onSubmitHandler = async (e) =>{
  e.preventDefault();
  try {
    
    if(currentState === "Sign Up"){
        const response = await axios.post(`${backendUrl}/api/user/register`,{name,email,password})
       if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
       }else{
        toast.error(response.data.message)
       }
        
    }else{

      const response = await axios.post(`${backendUrl}/api/user/login`,{email,password})
      if(response.data.success){
         setToken(response.data.token)
         localStorage.setItem("token",response.data.token)
      }else{
        toast.error(response.data.message) 
      }
    }


  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
  }
}

useEffect(()=>{
   if(token){
    navigate("/")
   }
},[token])

  return (
    <form onSubmit={onSubmitHandler} className='R1'>
     <div className='R2'> 
     <p className='R3'>{currentState}</p>
     <hr className='R4'/>
     </div>
      {currentState === "Login" ? "" :  <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='R5' placeholder='Name' required/>}
     <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='R5' placeholder='Email' required/>
     <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='R5' placeholder='Password' required/>
     <div className='R6'>
          <p className='R7'>Forgot your Password ?</p>
          {
            currentState === "Login"
            ?
            <p className='R7' onClick={()=>setCurrentState("Sign Up") }>Create account</p>
            :<p className='R7' onClick={()=>setCurrentState("Login")}>Login here</p>
          }
     </div>
            <button className='R8'>{currentState === "Login" ? "Sign In" : "sign Up"}</button>
    </form>
  )
}

export default Login