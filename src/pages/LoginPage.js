import React, { useCallback, useState, useEffect } from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router'; 
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 

function LoginPage( { isLoggedIn, setIsLoggedIn, setUserInfo } ){
    const navigate = useNavigate(); 
    const [error, setErrors] = useState(); 
    
    //If user is logged in, navigate to their dashboard
    useEffect(() => {
        if(isLoggedIn) return navigate("/dashboard/:id")
    }, [isLoggedIn, navigate]);

    //Temp playholder for login and errors
    //useCallback allows loginUser to run ONLY when e has changed (so when we update e)
    const loginUser = useCallback((e) => {
        //e represents the form at it's current state
        //Don't want the form to submit on default
        e.preventDefault(); 
        console.log(e); 

        //Get the email and password from the form
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        console.log({email, password}); 

        const auth = getAuth(); 
        signInWithEmailAndPassword(auth, email, password) 
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
            <h1>Login</h1> 
            <LoginForm loginUser = {loginUser}/>
            <p>{error}</p>
            <p>Don't have an account?</p>
            <Link to="/signup">
                <p>Create an account</p>
            </Link>
        </div>
    );

}

export default LoginPage; 