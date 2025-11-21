import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let verifyUser=false;
    let token= localStorage.getItem('token')
    if(token){
        verifyUser=true;
    }
  return (
    <div>
      {verifyUser? <Outlet/> : <Navigate to={'/'}/>}
    </div>
  )
}

export default PrivateRoutes
