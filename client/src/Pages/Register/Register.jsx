import React from 'react'
import {useRef} from "react";
import axios from "../../axiosConfig";
import {useNavigate,Link} from "react-router-dom";
import "./register.css";

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
      <form onSubmit={handlesubmit} className='register-compo'>
       <h1 className='create'>Create a new account</h1>
       <p className='tologin'>Already have an account? <Link to={'/login'}>Login</Link></p>
       <input 
        ref={emailDom}type="email"  placeholder="email"/>
        <br />
        <br />
        
        <div className='container'>
        <input className='short-input' 
        ref={firstnameDom}type="text"  placeholder="firstname"/>
        
        
        <input 
        ref={lastnameDom} className='short-input'
        type="text"  placeholder="lastname"/>
        
        </div>
        <br />
       
        <input 
        ref={usernameDom}
        type="text"  placeholder="username"/>
        <br />
        <br />
        
        
       
        
        <input ref={passwordDom}type="password"  placeholder="password"/>
        <br />
        <br />
        <div className='btn-center'>
        <button  className='btn-register'type='submit'>Agree and Join</button>
        </div>

      </form>
    </section>
  )
}

export default Register