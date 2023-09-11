import React from 'react'
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedContent = () => {
  const userData = useSelector((state)=>state?.user);

  return (
    <>
    {userData?.isLoggedIn ? <Outlet/> : <Navigate to="/login" />}
    </>
  )
}

export default ProtectedContent;