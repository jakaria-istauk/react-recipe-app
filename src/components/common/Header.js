import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
import { isLoggedIn, setLoggedOut } from '../../hooks/authentication';
import { redirect } from 'react-router-dom';
import { getUserFullName } from '../../hooks/helper';

export default function Header() {
  const [dropDown, setDropDown] = useState(false);
  const [collaps, setCollaps] = useState(false);

  const handleLogout = useCallback((e)=>{
    setLoggedOut();
    window.location.replace('/');
  });

  const dropDownHandler = useCallback( e => {
    setDropDown(!dropDown)
  });

  const collapsHandler = useCallback( e => {
    setCollaps(!collaps);
  });

  return (
    <header className="p-3 bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white">
        <div className="container">
          <Link to="/" className="navbar-brand text-white">
            <img className='recipe-logo me-2' src='https://icon-library.com/images/recipe-icon/recipe-icon-4.jpg' />
            RECIPE
          </Link>
          
          <button onClick={collapsHandler} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${collaps ? 'show' : ''}`}>
          <ul className="navbar-nav">
          {
              isLoggedIn ?
              <>
                <li><Link to="/recipe/new" className='nav-link px-2 text-white'>Add New Recipe</Link></li>
              </>
              : ''
            }
              <li><Link to="/" className='nav-link px-2 text-white'>All Recipe</Link></li>
              <li><Link to="/blogs" className='nav-link px-2 text-white'>Blogs</Link></li>
            </ul>
          </div>
          <div className={`${!isLoggedIn ? 'd-md-flex' : ''} logged-btns ${dropDown ? 'responsive' : ''}`}>
            {
              ! isLoggedIn ?
               <>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/sign-up" className="btn btn-warning">Sign-up</Link>
               </>
              :
              <>
              <div className="nav-item dropdown">
            
                <div onClick={dropDownHandler} className={`dropdown-toggle ${dropDown?'show':''}`}>
                  {getUserFullName()}
                </div>
                {
                  ! dropDown ? '' :
                  <ul className={`dropdown-menu dropdown-menu-dark ${dropDown?'show':''}`}>
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/profile/edit">Edit Profile</Link></li>
                    <li><button type="button" onClick={handleLogout} className="dropdown-item btn btn-outline-light me-2">Logout</button></li>
                  </ul>
                }
              </div>
              </>
            }
          </div>
        </div>
    </nav>
  </header>
  )
}
