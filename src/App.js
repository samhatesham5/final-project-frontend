//Imports
import './App.css';
import React from 'react';
import { useEffect, useState } from "react"; 

//React-router dom
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 

//Pages
import CreateTag from './pages/CreateTag';
import DashboardPage from './pages/DashboardPage.js';
import LandingPage from './pages/LandingPage.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import Profile from './pages/Profile';

//Firebase
import { initializeApp } from "firebase/app"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc9QBcJRuu3CbYUU5WQHaEtk67D36U3_I",
  authDomain: "final-project-6e412.firebaseapp.com",
  projectId: "final-project-6e412",
  storageBucket: "final-project-6e412.appspot.com",
  messagingSenderId: "1073747175134",
  appId: "1:1073747175134:web:3cccaf09076c1e0de2c44f"
};

function App() {
  const [appInitialized, setAppInitalized] = useState ();
  const [isLoading, setIsLoading] = useState (true);
  const [isLoggedIn, setIsLoggedIn] = useState (false);
  const [userInfo, setUserInfo] = useState ({});
  //New set states 
  //We want to tag other users' posts so we need information about the user's tags and who we're following
  const [userTags, setUserTags] = useState([]); 

  useEffect(()=> {
    //Initalize firebase
    const app = initializeApp(firebaseConfig);
    //Set the state to true
    setAppInitalized(app);
  }, []); 

  useEffect(() => {
    if (appInitialized) {
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
      element: <SignUpPage
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
      path: "/dashboard/:id",
      element: <DashboardPage 
        app = {appInitialized}
        isLoggedIn = {isLoggedIn}
        setIsLoggedIn = {setIsLoggedIn}
        isLoading = {isLoading}
        userInfo = {userInfo}
        setUserInfo = {setUserInfo}
        userTags = {userTags}
        setUserTags = {setUserTags}

      
      />,
    },
    {
      path: "/createtag",
      element: <CreateTag
      app = {appInitialized}
      isLoggedIn = {isLoggedIn}
      setIsLoggedIn = {setIsLoggedIn}
      isLoading = {isLoading}
      userInfo = {userInfo}
      setUserInfo = {setUserInfo}
      userTags = {userTags}
      setUserTags = {setUserTags}
      
      />,
    },
    {
      path: "/profile",
      element: <Profile 
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
