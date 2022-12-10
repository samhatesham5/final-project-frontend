import React, { useEffect, useMemo, useCallback, useState} from 'react';
import { Link } from "react-router-dom";
//Components and pages
import DashNav from '../components/DashNav';
import FindFriends from '../components/FindFriends';
import Post from '../components/Post';
import WritePost from '../components/WritePost'; 
import CreateTag from './CreateTag';
//Firebase stuff
import { addDoc, getDocs, getFirestore, collection, querySnapshot } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router'; 

const queryData = async(app) => {
    if (!app) return []; 
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postData= [];
    querySnapshot.forEach((doc) => {
        postData.push(doc.data()); 
    });
    console.log(postData);
    return postData; 
};

const tagQueryData = async(app) => {
    if (!app) return []; 
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "tags")); 
    const userTags= [];
    const userTagData =[]; 
    querySnapshot.forEach((doc) => {
        //Grabbing the post id and storing it into tag data
       //tagIDs.push(doc.id);
        userTagData.push(doc.data()); 
    });
   console.log(userTagData);
  //  console.log(tagIDs);
    return userTagData; 
};

function DashboardPage( {app, isLoggedIn, setIsLoggedIn, isLoading, userInfo, setUserInfo, userTags, setUserTags}){

    const navigate = useNavigate();
    const [postData, setPostData] = useState([]); 
    const [postTags, setPostTags] = useState([]);
    const [postSuccesful, setPostSucessful] = useState(false); 

    useEffect(() => {
        if (!app) return;
        queryData(app).then(setPostData);
        tagQueryData(app).then(setPostTags);
    }, [app]);

    return(
        <div className = 'dashboardWrapper'> 
            {/* UserSection */}
            <section className='userSection'>
                <div className='dashUser'> 
                    <DashNav 
                        isLoggedIn = {isLoggedIn}
                        setIsLoggedIn = {setIsLoggedIn}
                        isLoading = {isLoading}
                        userInfo = {userInfo}
                        setUserInfo = {setUserInfo}
                    /> 
                </div>
            </section>
            {/*Main */}
            <section className='mainContent'>
                <div className = 'writePostWrapper'>
                    <p>What's on your mind?</p>
                    <Link to= "/createtag" className='dashPost button'> 
                        <p>Create a post</p>
                    </Link> 
                </div>
                {/* We'll revisit this because if you search for friends, different component shows up there*/}
                <div className='dashContent'>
                    {/* Will store all of our posts and map over them */}
                    {postData.map((postData, i) => (
                        <Post 
                            key = {i}
                            caption = {postData.caption}
                            userID = {postData.userID}
                            userName = {postData.userName}
                            userTags = {postData.tags}
                        />
                    ))}
                </div>
            </section>
            {/* Should only be one account there */}
            <section className=''>
                <p>Placeholder until we figure something out</p>
            </section>
        </div>
    );

}

export default DashboardPage; 