import React from 'react'
import {useRef} from "react";
import axios from "../axiosConfig"
import { useNavigate } from 'react-router-dom';



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
    <form onSubmit={handlesubmit}>
   
    <label htmlFor="email">email:</label>
    <input 
    ref={emailDom}type="email"  placeholder="email"/>
    <br />
    <br />
    <label htmlFor="password">password:</label>
    <input ref={passwordDom}type="password"  placeholder="password"/>
    <br />
    <br />
    <button type='submit'>login</button>

  </form>
  )
}

export default Login