import React from 'react'
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { isLoggedIn } from '../../hooks/authentication';

const ProtectedContent = () => {
  return (
    <>
    {isLoggedIn ? <Outlet/> : <Navigate to="/login" />}
    </>
  )
}

export default ProtectedContent;