import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import Signup from './components/Signup'
import { useStore } from './store/authStore'
import Login from './components/Login'
import { Navigate, Route, Routes } from 'react-router-dom'

const ProtectRoute = ({ children }) => {
  const {isAuthenticated, user} = useStore();
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Login />
  }
  return children;
}

const App = () => {
  const { isCheckingAuth, checkAuth } = useStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  if (isCheckingAuth) return 'Loading...';
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProtectRoute><Form /></ProtectRoute>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='*' element={<ProtectRoute><Form /></ProtectRoute>} /> */}
      </Routes>
    </div>
  )
}

export default App