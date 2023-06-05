import React, {useState, useEffect, useContext, CSSProperties} from 'react'
import './signUp.css'
import axios from 'axios';
import {ThemeContext} from '../../contexts/ThemeContext';
import {UserContext} from '../../contexts/UserContext';

import { Link } from 'react-router-dom';


function SignUp({serverUrl}) { 

    const {token}=useContext(UserContext)
    const {darkMode,setDarkMode}=useContext(ThemeContext)
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [username, setUsername]=useState('');
    const [success, setSuccess]=useState(false);



const handleSignUp=(e)=>{
    e.preventDefault();
    axios.post(`${serverUrl}users/signUp`, {email,password,username})
    .then(res=>{
        console.log(res.data)
        if(res.data.status===409){
        alert('There is another user with this email. Please sign in with a different email.')
    }else{
        setSuccess(true)
        setPassword('')
        setEmail('')
        setUsername('')

    }
    })
    .catch(err=>console.log(err))
}


    
 
  return ( 
    <div className={darkMode ? "signup-container" : "signup-container signup-light"} >

        {
            token
            ? <p>You are already loggedin.</p>
            : <form className="signup-form" onSubmit={handleSignUp}>
            <div className="title-container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
            </div> 
            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}> 
                <label htmlFor="email">Email</label>
                <input value={email} type="email" placeholder="Enter Email" name="email" required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}>
                <label htmlFor="psw">Password</label>
                <input value={password} type="password" placeholder="Enter Password" name="psw" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}>
                <label htmlFor="username">Username</label>
                <input value={username} type="text" placeholder="Enter Username" name="username" required onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="button-container">
                <button type="reset" className="cancelbtn">Cancel</button>
                <button type="submit" className="signupbtn">Sign Up</button>
            </div>
            {
                success 
                ? <p className="success-message">Signed up successfully! <Link to="/signin">Sign In</Link></p>
                : <p className="signin-message">Already have an account? <Link to="/signin">Sign In</Link></p>
            }
        </form>
        }
        
    </div>
  )
}

export default SignUp