import React from 'react'
import { useContext } from 'react'
import {AppState} from "../App"
import QuestionList from './QuestionList/QuestionList';
import { Link } from 'react-router-dom';
import './home.css'

function Home() {

    const {user}=useContext(AppState);
  return (
    <div>
   
   <br />
   <button className='btn-ask'> <Link className="ask-quest"to={"/ask"}>ask Question</Link> </button>
   <h2 className='welcome-user'>welcome :
     <span>{user?.username} </span>   </h2>
   {/* here there will be the question list and then  */}
   <QuestionList/>
   </div>


  )
}

export default Home