import React,{useState} from 'react';
import axios from "../../axiosConfig";
import "./ask.css"

function Ask() {
    const[title,setTitle]=useState("");
    const [description,setDescription]=useState("")






     async function handlePost(){
        try{
            const token = localStorage.getItem("token");
            await axios.post("/questions/ask",{
                title,description

            },
        {
            headers:{
                Authorization:`Bearer ${token}`

            }
        });
            alert("question posted successfully")

        }catch(error){
            console.error("error posting questions",error)
            alert("failed to post the question .please try again")
            
        }
    }
  return (
    <div className='postquestion'>
        <h1 className='steps-title'>steps to write a good question</h1>
        <ul>
            <li className='steps'>summerize your problems in a one-line-title</li>
            <li className='steps'>describe your problem in more detail.</li>
            <li className='steps'>Describe what you tried and what you expected to happen</li>
            <li className='steps'>review your question and post it here</li>
        </ul>
        <h2 className='post-inst'>Post Your Question</h2>
        <div className='inputs'>
        <input type="text"
         placeholder='Question Title' 
         value={title}
         onChange={(e)=>setTitle(e.target.value)} className='inputtitle'/>
        <textarea name="" id="" placeholder='Question detail....'
        value={description}
        onChange={(e)=>{
            setDescription(e.target.value)
        }}></textarea>
        </div>
        <button onClick={handlePost}className='btn-post'>Post Question</button>
    </div>
    
  )
}

export default Ask