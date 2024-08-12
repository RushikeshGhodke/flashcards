import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='header'>
        <h1>EduCards</h1>
        <Link to={"/admin-dashboard"} className='btn'>Admin Dashboard</Link>
    </div>
  )
}

export default Header