import React, { useState } from 'react'
import { NavLink, useHistory} from 'react-router-dom'
import logomain from '../images/logomain.jpg'

const Signup = () => {

  const history = useHistory();

  const [user, setUser] = useState({
    name:"",email:"", phone:"", branch:"",year:"",rollno:"",password:"",cpassword:""
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value})
  }

  const PostData = async(e)=> {
    e.preventDefault();
    const {name, email, phone, branch, year, rollno, password, cpassword} = user;
    const res = await fetch("/register", {
      method : "POST",
      headers : {
        "content-type": "application/json"
      },
      body:JSON.stringify({
        name, email, phone, branch, year, rollno, password, cpassword
      })
    });

    const data = await res.json();

    if (res.status === 422 || !data){
      window.alert("Registration failed");
      console.log("Registration failed");
    }else{
      window.alert("Registration successful");
      console.log("Registration successful");
      history.push("/login");
    }
  }
  return(
    <>
      <section className = "signup">
        <div className = "container mt-5 p-5">
          <div className = "signup-content">
            <div className = "signup-form">
              <h2 className = "form-title">Sign up</h2>
              <form className = "register-form" id = "register-form" method = "POST">

              <div className = "form-group">
                <label htmlFor = "name"><i class="zmdi zmdi-account"></i></label>
                <input type = "text" name = "name" id = "name" autoComplete = "off" value = {user.name} onChange = {handleInputs} placeholder = "Your Name"></input>
              </div>

              <div className = "form-group">
                <label htmlFor = "email"><i class="zmdi zmdi-email"></i></label>
                <input type = "text" name = "email" id = "email" autoComplete = "off" value = {user.email} onChange = {handleInputs} placeholder = "Your Email"></input>
              </div>

              <div className = "form-group">
                <label htmlFor = "phone"><i class="zmdi zmdi-phone-in-talk"></i></label>
                <input type = "number" name = "phone" id = "phone" autoComplete = "off" value = {user.phone} onChange = {handleInputs} placeholder = "Your Phone"></input>
              </div>

              <div className = "form-group">
                <label htmlFor = "branch"><i class="zmdi zmdi-edit"></i></label>
                <input type = "text" name = "branch" id = "branch" autoComplete = "off" value = {user.branch} onChange = {handleInputs} placeholder = "Your Branch"></input>
              </div>

              <div className = "form-group">
                <label htmlFor = "year"><i class="zmdi zmdi-calendar-alt"></i></label>
                <input type = "number" name = "year" id = "year" autoComplete = "off" value = {user.year} onChange = {handleInputs} placeholder = "Your Year"></input>
              </div>

              <div className = "form-group">
                <label htmlFor = "rollno"><i class="zmdi zmdi-account-box"></i></label>
                <input type = "text" name = "rollno" id = "rollno" autoComplete = "off" value = {user.rollno} onChange = {handleInputs} placeholder = "Your Rollno"></input>
              </div>

              <div className = "form-group">
                <label htmlFor = "password"><i class="zmdi zmdi-lock"></i></label>
                <input type = "password" name = "password" id = "password" autoComplete = "off" value = {user.password} onChange = {handleInputs} placeholder = "Your Password"></input>
              </div>

              <div className = "form-group">
                <label htmlFor = "cpassword"><i class="zmdi zmdi-account-box"></i></label>
                <input type = "password" name = "cpassword" id = "cpassword" autoComplete = "off" value = {user.cpassword} onChange = {handleInputs} placeholder = "Confirm your password"></input>
              </div>

              <div className = "form-group form-button">
                <input type = "submit" name= "signup" id = "signup" className = "form-submit" value = "register" onClick = {PostData}></input>
              </div>
              </form>
              </div>
              <div className = "signup-image col-lg-6">
                <figure>
                  <img src = {logomain} alt = "logo"/>
                </figure>
                <NavLink to = "/login" className = "signup-image-link">I am already registered</NavLink>
               
              </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup;