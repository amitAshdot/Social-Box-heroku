import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className='navbar'>
            <h1>Social-box</h1>
            <ul>
                <li>
                    <Link to="#" target="_blank" rel="noopener">Home</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar