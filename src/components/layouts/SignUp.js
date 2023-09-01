import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useData from '../../hooks/useData';
import { useDispatch } from 'react-redux';
import { getUserByEmail, registerUser } from '../redux/reducers';

const SignUp = () => {
    const dispatchAction = useDispatch();
    const [hasUser, setHasUser] = useState(false);
    const [user, setUser] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const user = {
            name: [formData.get('firstName'), formData.get('lastName')].join(' '),
			email: formData.get('email'),
			password: formData.get('password'),
		}
        
        let theUser = getUserByEmail(user.email);
        if( theUser.length > 0 ){
            setHasUser(true);
        }
        else{
            dispatchAction( registerUser(user) );
        }
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
                        <input type="password" id="loginPassword" name='password' autoComplete='' className="form-control" required/>
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