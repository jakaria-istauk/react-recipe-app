import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getUserByEmail, registerUser } from '../redux/reducers';
import { isLoggedIn, setLoggedIn } from '../../hooks/authentication';
import { redirect } from 'react-router-dom';

const SignUp = () => {
    const loginPassword = useRef(null);
    const dispatchAction = useDispatch();
    const [hasUser, setHasUser] = useState(false);
    const [isPassValid, setIsPassValid] = useState(false);
    const [user, setUser] = useState();

    const handlePassword = useCallback((e) => {
        setIsPassValid(loginPassword.current.value.length > 6);
	})

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const user = {
            name: [formData.get('firstName'), formData.get('lastName')].join(' '),
			email: formData.get('email'),
			password: formData.get('password'),
		}


        if( user.password.length < 6 ){
            setIsPassValid(false);
            return;
        }
        
        let theUser = getUserByEmail(user.email);
        if( theUser ){
            setHasUser(true);
        }
        else{
            dispatchAction( registerUser(user) );
            setLoggedIn(true);
            window.location.replace('/');
        }
    }
    if(isLoggedIn){
        window.location.replace('/');
    }

  return (
    <div className='container'>
        <form action="#" method='post' onSubmit={handleSubmit}>
            <div className='row justify-content-md-center'>
                <div className='card col col-lg-6 m-4 p-4'>
                {hasUser ? <div className="alert alert-danger text-center" role="alert"> Email already exit </div> : ''}
                    <div className='row g-2 mb-4'>
                        <div className="col-lg-6 form-outline">
                            <label className="form-label" htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name='firstName' className="form-control" required/>
                        </div>
                        <div className="col-lg-6 form-outline">
                            <label className="form-label" htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name='lastName' className="form-control" required/>
                        </div>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="email" id="email" name='email' className="form-control" required/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                        <input ref={loginPassword} onKeyDown={handlePassword} type="password" id="loginPassword" name='password' autoComplete='' className="form-control" required/>
                        {!isPassValid ? <div className="invalid-feedback"> Password must have 6 characters </div> : ''}
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign Up</button>

                    <div className="text-center">
                        <p>Already a member? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SignUp;