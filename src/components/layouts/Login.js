import React from 'react'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='container'>
        <div className='row justify-content-md-center'>
            <div className='card col col-lg-6 m-4 p-4'>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">Email or username</label>
                    <input type="email" id="loginName" className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                    <input type="password" id="loginPassword" className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                <div className="text-center">
                    <p>Not a member? <Link to="/sign-up">Register</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;