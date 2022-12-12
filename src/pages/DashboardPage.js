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
    return userTagData; 
};

function DashboardPage( {app, isLoggedIn, setIsLoggedIn, isLoading, userInfo, setUserInfo, userTags, setUserTags}){

    const navigate = useNavigate();
    const [postData, setPostData] = useState([]); 
    const [postTags, setPostTags] = useState([]);
    var   [targetPosts, setTargetPosts] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState([]);

    useEffect(() => {
        if (!app) return;
        queryData(app).then(setPostData);
        tagQueryData(app).then(setPostTags);
        

    }, [app]);

    const yourPosts = useCallback( () => {
        targetPosts = [];
        postData.some(post => {
            if(post.userName == userInfo.displayName) {
                targetPosts.push(post); 
            }
        });

        setDisplayedPosts(targetPosts);
    }, [displayedPosts]);
    
    const allPosts = useCallback(() => {
        targetPosts = [];
        postData.some(post => {
            targetPosts.push(post);
        }); 
        setDisplayedPosts(targetPosts);
    }, [displayedPosts]);

    //You'll pass the tagName into here
    const displayTagged = useCallback (
        async(tag) => {
            const tagName = tag; 

                targetPosts = [];
                 //Find posts with the same tagName
                const findTagged = postData.some(post => {
                    
                    if(post.tagName === tag) {
                        //Store them in targetPosts
                        targetPosts.push(post); 
                    }
            });

            //Switch from postData to targetPosts
            setDisplayedPosts(targetPosts);

        }, [displayedPosts]);

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
                        postTags = {postTags}
                        postData = {postData}
                        yourPosts = {yourPosts}
                        allPosts = {allPosts}
                        displayTagged = {displayTagged}
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
                <div className='dashContent' >
                    {/* Will store all of our posts and map over them */}
                    {displayedPosts.map((displayedPosts, i) => (
                        <Post 
                            key = {i}
                            caption = {displayedPosts.caption}
                            userID = {displayedPosts.userID}
                            userName = {displayedPosts.userName}
                            userTags = {displayedPosts.tagName}
                        />
                    ))}
                </div>
            </section>
        </div>
    );

}

export default DashboardPage; 
