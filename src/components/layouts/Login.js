import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getUserByEmail } from '../redux/reducers';
import { isLoggedIn, setLoggedIn } from '../../hooks/authentication';
import { redirect } from 'react-router-dom';

function Login() {
    const [valid, setValid] = useState(true);
    const [message, setMessage] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        setValid(false);
        const user = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        let theUser = getUserByEmail(user.email);

        if( theUser?.email === user.email && theUser?.password === user.password ){
            setValid(true);
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
                {!valid ? <div className="alert alert-danger text-center" role="alert">Invalid Email or Password!</div> : ''}
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="loginName">Email or username</label>
                        <input type="email" name='email' id="loginName" className="form-control" required/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                        <input type="password" name='password' id="loginPassword" className="form-control" autoComplete='' required/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                    <div className="text-center">
                        <p>Not a member? <Link to="/sign-up">Register</Link></p>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login;