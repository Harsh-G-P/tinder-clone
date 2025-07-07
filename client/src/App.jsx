import React, { useEffect } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'

import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import ChatPage from './Pages/ChatPage'
import AuthPage from './Pages/AuthPage'
import { useAuthStore } from './Store/useAuthStore'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {checkAuth,authUser,checkingAuth} = useAuthStore()

    useEffect(()=>{
      checkAuth()
    },[checkAuth])

    if (checkingAuth) {
      return null
    }
    
  return (
    <div className='absolute inset-o -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,
    transparent_1px), linear-gradient(to_bottom, #f0f0f0_1px, transparent_1px)] bg-[size:6rem_4rem]'>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={'/auth'} />} />
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to={'/'} />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={'/auth'} /> } />
        <Route path='/chat/:id' element={authUser ? <ChatPage /> : <Navigate to={'/auth'} /> } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App