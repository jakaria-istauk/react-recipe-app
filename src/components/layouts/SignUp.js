import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { setLoggedIn } from '../../hooks/authentication';
import { registerUser } from '../../hooks/userApiHandler';

const SignUp = () => {
    const loginPassword = useRef(null);
    const loginPassword2 = useRef(null);
    const [isPassValid, setIsPassValid] = useState(true);
    const [passMatched, setPassMatched] = useState(true);
    const [message, setMessage] = useState();
    const [valid, setValid] = useState(true);
    const [isSubmitted, setSubmitted] = useState(false);

    const handlePassword = useCallback((e) => {
        setIsPassValid(loginPassword.current.value.length > 5 );
        if( loginPassword2.current.value.length > 0 ){
            setPassMatched(loginPassword.current.value == loginPassword2.current.value);
        }
	});

    const confirmPassword = useCallback((e)=>{
        setPassMatched(loginPassword.current.value == loginPassword2.current.value);
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setSubmitted(true);

        if( loginPassword.current.value != loginPassword2.current.value ){
            setMessage('Password not matched');
            setSubmitted(false);
            setValid(false);
            return;
        }
        else if(loginPassword.current.value.length < 6  ){
            setMessage('Password must have 6 characters');
            setSubmitted(false);
            setValid(false);
            return;
        }
        
        registerUser(formData).then((response)=>{
            if( response?.status ){
                setValid(true);
                setLoggedIn(response);
                window.location.replace('/');
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
        <div className='row justify-content-md-center'>
            <div className='card col col-lg-6 m-4 p-4'>
            {!valid ? <div className="alert alert-danger text-center" role="alert">{message}</div> : ''}
                <div className='row g-2 mb-4'>
                    <div className="col-lg-6 form-outline">
                        <label className="form-label" htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name='first_name' className="form-control" required/>
                    </div>
                    <div className="col-lg-6 form-outline">
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name='last_name' className="form-control" required/>
                    </div>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="email" id="email" name='email' className="form-control" required/>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                    <input ref={loginPassword} onChange={handlePassword} type="password" name='password' autoComplete='' className="form-control" required/>
                    { !isPassValid ? <div className="invalid-feedback" style={{display:'block'}}> Password must have 6 characters </div> : ''}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword2">Confirm Password</label>
                    <input ref={loginPassword2} onChange={confirmPassword} type="password" name='password2' autoComplete='' className="form-control" required/>
                    { !passMatched ? <div className="invalid-feedback" style={{display:'block'}}> Password not matched </div> : ''}
                </div>
                
                <button type="submit" className="btn btn-primary btn-block mb-4" disabled={isSubmitted || !isPassValid}>
                    {
                        isSubmitted ? 
                        <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing up....
                        </>
                        : 'Sign up'
                    }
                </button>

                <div className="text-center">
                    <p>Already a member? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    </form>
  )
}

export default SignUp;