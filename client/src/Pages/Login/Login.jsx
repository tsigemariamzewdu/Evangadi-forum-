import React from 'react'
import {useRef} from "react";
import axios from "../../axiosConfig";
import "./login.css";
import { useNavigate,Link } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';



function Login() {
    const emailDom=useRef();
    const passwordDom=useRef();
    const navigate=useNavigate()
    
    async function handlesubmit(e){
        e.preventDefault();
        
        const emailValue=emailDom.current.value;
        const passValue=passwordDom.current.value;
        
        if(
         
          !emailValue ||
          ! passValue
        ){
          alert ("please provide all required information");
          return
        }
        try{
          const {data}=await axios.post("/user/login",{
            
            email:emailValue,
            password:passValue
    
          });
          console.log("api response",data)
          alert ("login succesfull.")
          localStorage.setItem("token",data.token)
          console.log(data)
          navigate("/")
        } catch(error){
          alert(error?.response?.data?.msg)
          console.log(error.response)
        }
      
    
    
      }
  return (
    <div>
      <div className='login-compo'>
      <p id="login-intro">Login to your account</p>
      <p className='register'>Don't have an account?<Link to="/register">Create a new account</Link></p>
    <form onSubmit={handlesubmit}>
   
    
    <input 
    ref={emailDom}type="email"  placeholder="email"/>
    <br />
    <br />

    <input ref={passwordDom}type="password"  placeholder="password"/>
    <br />
    <br />
    <div className='btn-center'>
    <button type='submit' className='login'>login</button>
    </div>
  </form>
  </div>

  </div>

  
  )
}

export default Login