import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='container'>
        <form action="#" method='post'>
            <div className='row justify-content-md-center'>
                <div className='card col col-lg-6 m-4 p-4'>
                    <div className='row g-2 mb-4'>
                        <div className="col-lg-6 form-outline">
                            <label className="form-label" htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" className="form-control" />
                        </div>
                        <div className="col-lg-6 form-outline">
                            <label className="form-label" htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" className="form-control" />
                        </div>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="loginName">Email</label>
                        <input type="email" id="loginName" className="form-control" />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                        <input type="password" id="loginPassword" className="form-control" />
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

export default SignUp