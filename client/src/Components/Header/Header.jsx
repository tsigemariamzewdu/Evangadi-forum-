import React from 'react'
import { Link } from 'react-router-dom'
import blackimg from "../../images/blacklogo.png"
import "./header.css"

function Header() {
  return (
    <div className='header'>
        <img id ="logo-img"src={blackimg} alt="this is the logo" />
        <nav >
           
        <Link
        to={'/'} className="nav-link">Home</Link>
        <Link to={"/howitworks"} className="nav-link">How it Works</Link>
        <Link to={"/login"} className="nav-button">SIGN IN </Link>
        </nav>

    </div>
  )
}

export default Header