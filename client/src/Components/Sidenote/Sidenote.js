import React, { useContext } from 'react'
import "./sidenote.css";
import { Link, useNavigate } from 'react-router-dom';

function Sidenote() {
    const navigate=useNavigate()
    function handlehow(){
        navigate('/howitworks')
       }
  return (
    <section className="side-note">
    <Link> about</Link>
         <h1>Evangadi Networks Q&A</h1>
        <p>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps!

<br /> <br />Whether you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>

<button onClick={handlehow}> How it Works  </button>







      </section>

  )
}

export default Sidenote