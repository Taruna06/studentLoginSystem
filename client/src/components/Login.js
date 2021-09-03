import React, { useState } from 'react'
import logomain from '../images/logomain.jpg'
import { NavLink, useHistory } from 'react-router-dom'

const Login = () => {
  
  const history = useHistory();

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin', {
      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      body : JSON.stringify({
        email, password
      })
    });

    const data = res.json();
    if (res.status === 400 || !data){
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    }else {
      window.alert("Login Successful");
      history.push("/")
    }
  }
  return(
    <>
    <section className = "sign-in">
        <div className = "container mt-5  p-5">
          <div className = "signup-content">

          <div className = "signin-image">
                <figure>
                  <img src = {logomain} alt = "logo"/>
                </figure>
                <NavLink to = "/signup" className = "signin-image-link">Create an account</NavLink>
               
              </div>

            <div className = "signin-form">
              <h2 className = "form-title">Sign In</h2>
              <form method = "POST" className = "register-form" id = "register-form">

              <div className = "form-group">
                <label htmlFor = "email"><i class="zmdi zmdi-email"></i></label>
                <input type = "text" name = "email" id = "email" autoComplete = "off" 
                value = {email} placeholder = "Your Email"
                onChange ={(e) => {setEmail(e.target.value)} }></input>
              </div>
             
              <div className = "form-group">
                <label htmlFor = "password"><i class="zmdi zmdi-lock"></i></label>
                <input type = "password" name = "password" id = "password" autoComplete = "off" 
                value = {password} placeholder = "Your Password"
                onChange = {(ev) => {setPassword(ev.target.value)}}></input>
              </div>

                       
              <div className = "form-group form-button">
                <input type = "submit" name= "signin" id = "signin" className = "form-submit" 
                value = "Log In" onClick = {loginUser} ></input>
              </div>
              </form>
              </div>
              
          </div>
        </div>
      </section>
    </>
  )
}

export default Login;