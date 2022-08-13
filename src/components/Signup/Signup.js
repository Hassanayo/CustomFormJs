import React, { useRef } from 'react'
import "./signup.css"
// import { useAuth } from '../context/AuthContext'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    // const {signup} = useAuth()
  return (
    <div className='container'>
        <form className='form'>
            <h3 className='form-header'>Sign up</h3>
            <div className='form-group'>
                <label className='form-label'>Email</label>
                <input className='form-input' type="email" required ref={emailRef}/>
            </div>
            <div className='form-group'>
                <label className='form-label'>Password</label>
                <input className='form-input' type="email" required ref={passwordRef}/>
            </div>
            <div className='form-group'>
                <label className='form-label'>Confirm Password</label>
                <input className='form-input' type="email" required ref={passwordConfirmRef}/>
            </div>
            <button className='form-btn'>Sign Up</button>
            <hr/>
            <div className='log-in form-label'>
                <p>Already have an account?<span>Sign in</span></p>
            </div>
        </form>
    </div>
  )
}
