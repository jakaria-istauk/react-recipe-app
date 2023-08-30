import React from 'react'
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const ProtectedContent = () => {
    let isLoggedIn = true;
  return (
    <>
    {isLoggedIn ? <Outlet/> : <Navigate to="/sign-in" />}
    </>
  )
}

export default ProtectedContent;