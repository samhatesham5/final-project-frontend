import React from 'react';
import { Link } from "react-router-dom";

function Header(){

    return(
        <nav>
            <Link to="/" className='home'>
                <h2>tagit</h2>
            </Link>
            <div className='links'>
                <Link to="/signup" className='signUpButton button'>
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