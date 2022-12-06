import React, { useEffect, useState, useCallback }from 'react';
import SignUpForm from '../components/SignUpForm';
import { useNavigate } from 'react-router'; 
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 

function SignUpPage( { isLoggedIn, setIsLoggedIn, setUserInfo } ){
    const navigate = useNavigate(); 
    const [error, setErrors] = useState(); 
    
    //If user is logged in, navigate to to the little tutorial 
    useEffect(() => {
        if(isLoggedIn) return navigate("/createtag")
    }, [isLoggedIn, navigate]);

    //Temp playholder for login and errors
    const signUpUser = useCallback(
        //You can "e" what you want but it's an argument placeholder
        (e) => {
            //We don't want to HTML default on anything for the form
            e.preventDefault(); 
            //Targeting the value of the email input
            const email = e.currentTarget.email.value;
            //Targeting the value of the password input
            const password = e.currentTarget.password.value;

            console.log({email}, {password}); 

            const auth = getAuth(); 

        //Creating a user (copied from firebase docs)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                //Get access to the set state values
                setIsLoggedIn(true);
                setUserInfo ({
                    email: user.email,
                    displayName: user.displayName, 
                    password: user.password, 
                    uid: user.uid,
                    accessToken: user.accessToken, 
                });
                //Make our errors empty
                setErrors();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn({error, errorCode, errorMessage}); 
                setErrors(errorMessage); 
            });
        }, [setErrors, setIsLoggedIn, setUserInfo]);

    return(
        <div>
            <h1>Sign Up</h1> 
            <SignUpForm signUpUser = {signUpUser} /> 
            <p>{error}</p>
            <p>Have an account?</p>
            <Link to="/login">
                <p >Login</p>
            </Link>
        </div>
    );

}

export default SignUpPage; 