import React, {useEffect, useState, useCallback}from 'react';
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router'; 

//Font Awesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

//{isLoggedIn && <p className="signOut" onClick={() => logout()}>Sign Out</p>}

function DashNav( {allPosts, yourPosts, postData, postTags, isLoggedIn, setIsLoggedIn, isLoading, userInfo, setUserInfo, displayTagged} ){
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
                <p>{userInfo.displayName}</p>
            </div>
            {/*On click, we disply differ */}
            <div className='userLinks'>
                <Link to="/dashboard/:id" className='tagLinks' onClick={() => allPosts()}>All Posts</Link>
                <Link to ="/dashboard/:id" className ="tagLinks" onClick={() => yourPosts()}>Your Posts</Link>
                <p>Tags</p>
                <div className='tags'>
                    {/*Can be done by mapping over the array of tags, right? */}
                    {/*Alter these so that they're responsive*/}
                    {postTags.map((postTags, x) => (
                        <Link to="/dashboard/:id" className ="tagLinks" onClick={() => displayTagged(postTags.tagName)}>
                            {postTags.tagName}</Link>
                    ))}
                </div>
            </div>
            {isLoggedIn &&<FontAwesomeIcon className="signOut" onClick={() => logout()} icon={faRightFromBracket}/>}
        </div>
    );

}

export default DashNav; 