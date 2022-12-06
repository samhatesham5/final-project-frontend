import React, {useEffect, useState, useCallback}from 'react';
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router'; 

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
        <div>
            <div className='userBlurb'>
                <p>default icon</p>
                {/*They can't sign in with username but this is what's displayed */}
                <p>Username</p>
            </div>
            {/*On click, we disply differ */}
            <p>Your Posts</p>
            <p>Tags</p>
            <div className='tags'>
                {/*Can be done by mapping over the array of tags, right? */}
                <p>Tag 1</p>
                <p>Tag 2</p>
                <p>Tag 3</p>
            </div>
            {isLoggedIn && <p className="signOut" onClick={() => logout()}>Sign Out</p>}
        </div>
    );

}

export default DashNav; 