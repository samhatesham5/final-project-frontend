//React
import React from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header';
//Font Awesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTag} from '@fortawesome/free-solid-svg-icons';


function LandingPage(){

    return(
        <div>
            <Header /> 
            <hr /> 
            <div className='landingPage'>
                <div className='landingContent'>
                    <div className='headerOneTag'>
                        <h1>You're it!</h1> 
                        <FontAwesomeIcon icon={faTag}/>
                    </div>
                    <h2>"It's like Instagram, Tumblr, and Pinterest had a baby!"</h2>
                    <Link to="/signup" className='landingButton button'>
                        <p>Get Started</p>
                    </Link>
                </div>
                <img src="https://github.com/samhatesham5/final-project-frontend/blob/main/src/assets/4186624.jpg?raw=true" 
                    alt="two girls taking a selfie" 
                    style={{width: '500px'}}/>
            </div>

        </div>
    );

}

export default LandingPage; 
