import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
import { isLoggedIn, setLoggedOut } from '../../hooks/authentication';
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
                  <svg className='user-menu-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"/></svg>
                  <span className='ms-1 text-capitalize'>{getUserFullName()}</span>
                </div>
                {
                  ! dropDown ? '' :
                  <ul className={`dropdown-menu dropdown-menu-dark ${dropDown?'show':''}`}>
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/my-recipes">My Recipes</Link></li>
                    <li><Link className='dropdown-item' to="/recipe/new">Add New Recipe</Link></li>
                    <li><Link className="dropdown-item" to="/profile/edit">Edit Profile</Link></li>
                    <li>
                      <button type="button" onClick={handleLogout} className="dropdown-item btn btn-outline-light me-2">
                        Logout
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                      </button>
                    </li>
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
