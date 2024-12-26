
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import './App.css'
import EditPage from './pages/EditPage'


 export const backendUrl = process.env.REACT_APP_BACKEND_URL;
 export const currency ="$"
 console.log('Backend URL:', backendUrl);
function App() {

  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"")

  useEffect(()=>{
   localStorage.setItem("token",token)
  },[token])
  return (
    <div className='app'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='app1'>
            <Sidebar />
            <div className='app2'>
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/EditPage" element={<EditPage token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }

    </div>
  )
}

export default App