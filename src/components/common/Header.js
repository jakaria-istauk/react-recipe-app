import React, { useCallback, useState } from 'react'
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
  const [dropDown, SetDropDown] = useState(false);

  const dropDownHandler = useCallback( e => {
    SetDropDown(!dropDown)
  }
  );

  return (
    <header className="p-3 bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white">
        <div className="container">
          <Link to="/" className="navbar-brand text-white">
            <img className='recipe-logo me-2' src='https://icon-library.com/images/recipe-icon/recipe-icon-4.jpg' />
            RECIPE
          </Link>
          
          <button onClick={dropDownHandler} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${dropDown ? 'show' : ''}`}>
          {
              isLoggedIn ?
              <ul className="navbar-nav">
                <li><Link to="/add-recipe" className='nav-link px-2 text-white'>Add New Recipe</Link></li>
                <li><Link to="/" className='nav-link px-2 text-white'>All Recipe</Link></li>
              </ul>
              : ''
            }
          </div>
          <div className={`d-md-flex logged-btns ${dropDown ? 'responsive' : ''}`}>
            <Menus isLoggedIn={isLoggedIn} />
          </div>
        </div>
    </nav>
  </header>
  )
}
