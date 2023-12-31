import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { setLoggedIn } from '../../hooks/authentication';
import { authenticatUser } from '../../hooks/userApiHandler';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/reducers';
import { Navigate } from 'react-router-dom';

function Login() {
    const [valid, setValid] = useState(true);
    const [isSubmitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState();
    const dispatchAction = useDispatch();
    const userData = useSelector((state)=>state?.user);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setSubmitted(true);
        
        authenticatUser(formData).then((response)=>{
            if( response?.status ){
                setLoggedIn(response);
                dispatchAction( loginUser() );
            }
            else{
                setSubmitted(false);
                setMessage(response.message);
                setValid(false);
            }

        })
    }
    

  return (
    <form action="#" method='post' onSubmit={handleSubmit}>
        {userData?.isLoggedIn ? <Navigate to="/" /> : ''}
        <div className='row justify-content-md-center'>
            <div className='card col col-lg-6 m-4 p-4'>
            {!valid ? <div className="alert alert-danger text-center" role="alert">{message}</div> : ''}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">Email</label>
                    <input type="email" name='email' id="loginName" className="form-control" required/>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                    <input type="password" name='password' id="loginPassword" className="form-control" autoComplete='' required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4" disabled={isSubmitted}>
                    {
                        isSubmitted ? 
                        <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing....
                        </>
                        : 'Sign in'
                    }
                </button>

                <div className="text-center">
                    <p>Not a member? <Link to="/sign-up">Register</Link></p>
                </div>
            </div>
        </div>
    </form>
  )
}

export default Login;