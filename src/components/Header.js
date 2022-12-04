import React from 'react';
import { Link } from "react-router-dom";

function Header(){

    return(
        <nav>
            <h2>tagit</h2>
            <div className='links'>
                <Link to="/signup" className='button'>
                    <p >Sign Up</p>
                </Link>
                <Link to="/login" className='loginButton button'>
                    <p>Login</p>
                </Link>
            </div>
        </nav>
    );

}

export default Header; 