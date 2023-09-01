import React, { useCallback } from 'react'
import { Link } from 'react-router-dom';
import { isLoggedIn, setLoggedOut } from '../../hooks/authentication';
import { redirect } from 'react-router-dom';


const Menus = ( {isLoggedIn} ) => {

  const handleLogout = useCallback((e)=>{
    setLoggedOut();
    window.location.replace('/');
  });

  if(!isLoggedIn){
    return(
      <>
      <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
      <Link to="/sign-up" className="btn btn-warning">Sign-up</Link>
      </>
    );
  }
  else{
    return(
      <button type="button" onClick={handleLogout} className="btn btn-outline-light me-2">Logout</button>
    );
  }
}
export default function Header() {
  return (
    <header className="p-3 bg-dark text-white">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          RECIPE
        </Link>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          {/* <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
          <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" clclassNameass="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" className="nav-link px-2 text-white">About</a></li> */}
        </ul>

        <div className="text-end">
          <Menus isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  </header>
  )
}
