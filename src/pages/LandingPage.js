import React from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header';


function LandingPage(){

    return(
        <div>
            <Header /> 
            <hr /> 
            <div className='landingPage'>
                <div className='landingContent'>
                    <h2>Landing Page</h2> 
                    <p>Works works works</p>
                    <Link to="/signup" className='landingButton button'>
                        <p>Get Started</p>
                    </Link>
                </div>
                <img src="#" alt="two girls taking a selfie"/>
            </div>

        </div>
    );

}

export default LandingPage; 