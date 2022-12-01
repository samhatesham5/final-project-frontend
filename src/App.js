//Imports
import './App.css';
import React from 'react';
import { useEffect, useState } from "react"; 

//React-router dom
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 

//Pages
import DashboardPage from './pages/DashboardPage.js';
import LandingPage from './pages/LandingPage.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';

//Firebase
import { initializeApp } from "firebase/app"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhSYajHWQHWJfQJ3qTEHakR60-GrbyQBI",
  authDomain: "six-exercise.firebaseapp.com",
  projectId: "six-exercise",
  storageBucket: "six-exercise.appspot.com",
  messagingSenderId: "1062910567996",
  appId: "1:1062910567996:web:9b339941106c9872208539"
};


function App() {
  const [appInitialized, setAppInitalized] = useState (false);
  //Checking if the information is loading, user is logged in, and we get user info
  const [isLoading, setIsLoading] = useState (true);
  const [isLoggedIn, setIsLoggedIn] = useState (false);
  const [userInfo, setUserInfo] = useState ({});

  //Ensuring we initalize firebase one time (and not everytime the browser renders)
  useEffect(()=> {
    //Initalize firebase
    initializeApp(firebaseConfig);
    //Set the state to true
    setAppInitalized(true);
  }, []); 

  useEffect(() => {
    //If user is logged in (app is initalized), then run the following code
    if (appInitialized) {
      //Firebase abstraction (copied from firebase) -- just know that this should return a user's information as an object
      const auth = getAuth();
      onAuthStateChanged(auth, (user)=> {
        //If the user exist in firebase...
        if (user){
          //Set our user info
          setUserInfo(user);
          //Check off that they're signed in
          setIsLoggedIn(true);
        }
        //Assume user is signed out (or doesn't have an account)
        else {
          //To avoid getting an error, send back empty object
          setUserInfo({});
          setIsLoggedIn(false);
        }
        //Finished loading 
        setIsLoading(false);

      });
    }
    //If not, skip it
    //appInitalized (If that state equals true)
  }, [appInitialized]); 

  console.log({userInfo}); 


  //Creating paths for our pages
  const router = createBrowserRouter([
    //Homepage (if you've never signed in or created an account)
    {
      path: "/",
      element: <LandingPage/>
    },
    {
      path: "/signup",
      element: <LandingPage
        isLoggedIn = {isLoggedIn}
        setIsLoggedIn = {setIsLoggedIn} 
        setUserInfo = {setUserInfo} 
      />,
    },
    {
      path: "/login",
      element: <LoginPage
        isLoggedIn = {isLoggedIn}
        setIsLoggedIn = {setIsLoggedIn}
        setUserInfo = {userInfo}
      
      />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage
        isLoggedIn = {isLoggedIn}
        setIsLoggedIn = {setIsLoggedIn}
        isLoading = {isLoading}
        userInfo = {userInfo}
      
      />,
    },

]);
  return (
    <div className="App">
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
