import React, { useEffect, useMemo, useCallback, useState} from 'react';
import DashNav from '../components/DashNav';
import FindFriends from '../components/FindFriends';
import Post from '../components/Post';
import WritePost from '../components/WritePost'; 
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



function DashboardPage( {app, isLoggedIn, setIsLoggedIn, isLoading, userInfo, setUserInfo}){

    const navigate = useNavigate();
    const [postData, setPostData] = useState([]); 
    const [postSuccesful, setPostSucessful] = useState(false); 

    useEffect(() => {
        if (!app) return;
        queryData(app).then(setPostData);
    }, [app]);

    const createPost = useCallback(
       async (e) => {
            e.preventDefault(); 
            const db = getFirestore(app);
            const storage = getStorage();

            const caption = e.currentTarget.caption.value; 
            const userName = userInfo.displayName;
            const userID = userInfo.uid; 
        

            console.log(e); 

            //Getting all the info we need for the posts
            try{
                const docRef = await addDoc(collection(db, "posts"), {
                    caption,
                    userID: userID,
                    userName, 
                }); 
            
                setPostSucessful(true); 

            }
            catch (e){
                console.log("Error adding document: ",  e);
            }
    },  [app, userInfo]); 

    useEffect(() =>  {
        if(!isLoggedIn && !isLoading) navigate("/login");
    }, [isLoading, isLoggedIn, navigate]); 


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
                <div className='searchBar'> 
                    <form className='searchForm'>
                        <input type="text" placeholder='search'/> 
                        <button type="submit">Icon</button>
                    </form>
                </div>
                <div>
                    <WritePost  
                        createPost= {createPost}
                        setUserInfo = {setUserInfo}
                        userInfo = {userInfo}
                    />
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