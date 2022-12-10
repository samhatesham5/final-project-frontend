import React, {useEffect, useState, useCallback}from 'react';
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router'; 

//Font Awesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

//{isLoggedIn && <p className="signOut" onClick={() => logout()}>Sign Out</p>}

function DashNav( {isLoggedIn, setIsLoggedIn, isLoading, userInfo, setUserInfo} ){
    //Navigating out of dashboard
    const navigate = useNavigate(); 
    //Logout function
    function logout(){
        const auth = getAuth();
            signOut(auth)
            .then(() => {
                //We're gonna make this empty
                setUserInfo({});
                //Set logged in false
                setIsLoggedIn(false); 
            })
            .catch((error) => {
            console.warn(error); 
        })
    };

    //If you signout, it should log you out of the dashboard
    useEffect(() => {
        if(!isLoggedIn) return navigate("/login")
    }, [isLoggedIn, navigate]);


    return(
        <div className = 'dashWrapper'>
            <div className='userBlurb'>
                <img src="https://github.com/samhatesham5/final-project-frontend/blob/main/src/assets/user.png?raw=true" alt="user profile icon"/>
                {/*They can't sign in with username but this is what's displayed */}
                <p>Username</p>
            </div>
            {/*On click, we disply differ */}
            <div className='userLinks'>
                <p>Your Posts</p>
                <p>Tags</p>
                <div className='tags'>
                    {/*Can be done by mapping over the array of tags, right? */}
                    {/*Alter these so that they're responsive*/}
                    <p>Tag 1</p>
                    <p>Tag 2</p>
                    <p>Tag 3</p>
                </div>
            </div>
            {isLoggedIn &&<FontAwesomeIcon className="signOut" onClick={() => logout()} icon={faRightFromBracket}/>}
        </div>
    );

}

export default DashNav; 