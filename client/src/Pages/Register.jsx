import React from 'react'
import {useRef} from "react";
import axios from "../axiosConfig";
import {useNavigate} from "react-router-dom"

function Register() {
  const navigate=useNavigate()

  const usernameDom=useRef();
  const firstnameDom =useRef();
  const lastnameDom=useRef();
  const emailDom=useRef();
  const passwordDom=useRef();

  async function handlesubmit(e){
    e.preventDefault();
    const usernameValue=usernameDom.current.value;
    const firstValue=firstnameDom.current.value;
    const lastValue=lastnameDom.current.value;
    const emailValue=emailDom.current.value;
    const passValue=passwordDom.current.value;
    
    if(
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      ! passValue
    ){
      alert ("please provide all required information");
      return
    }
    try{
      await axios.post("/user/register",{
        username:usernameValue,
        firstname:firstValue,
        lastname:lastValue,
        email:emailValue,
        password:passValue

      });
      alert ("register succesfull. please login")
      navigate("/login")
    } catch(error){
      alert("something went wrong!")
      console.log(error.response)
    }
  


  }




  return (
    <section>
      <form onSubmit={handlesubmit}>
        <label htmlFor="Username">Username:</label>
        <input 
        ref={usernameDom}
        type="text"  placeholder="username"/>
        <br />
        <br />
        <label htmlFor="firstname">firstname:</label>
        <input 
        ref={firstnameDom}type="text"  placeholder="firstname"/>
        <br />
        <br />
        <label htmlFor="lastname">lastname:</label>
        <input 
        ref={lastnameDom}
        type="text"  placeholder="lastname"/>
        <br />
        <br />
        <label htmlFor="email">email:</label>
        <input 
        ref={emailDom}type="email"  placeholder="email"/>
        <br />
        <br />
        <label htmlFor="password">password:</label>
        <input ref={passwordDom}type="password"  placeholder="password"/>
        <br />
        <br />
        <button type='submit'>register</button>

      </form>
    </section>
  )
}

export default Register