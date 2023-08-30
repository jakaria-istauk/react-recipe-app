import React from 'react'
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const ProtectedContent = () => {
    let isLoggedIn = false;
  return (
    <>
    {isLoggedIn ? <Outlet/> : <Navigate to="/login" />}
    </>
  )
}

export default ProtectedContent;