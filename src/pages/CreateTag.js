import React, {useState, useEffect, useCallback, useMemo} from 'react';
import WritePost from '../components/WritePost';
import DashboardPage from './DashboardPage';

import { addDoc, getDocs, getFirestore, collection, querySnapshot, QuerySnapshot } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router'; 

const queryData = async(app) => {
    if (!app) return []; 
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postData= [];
    //const postIDs =[]; 
    querySnapshot.forEach((doc) => {
        //Grabbing the post id and storing it into tag data
        //postIDs.push(doc.id);
        postData.push(doc.data()); 
    });
   // console.log(postData);
   // console.log(postIDs);
    return postData; 
};

const tagQueryData = async(app) => {
    if (!app) return []; 
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "tags"));
    const tagData= [];
    const tagIDs =[]; 
    querySnapshot.forEach((doc) => {
        //Grabbing the post id and storing it into tag data
        tagIDs.push(doc.id);
        tagData.push(doc.data()); 
    });
   // console.log(tagData);
  //  console.log(tagIDs);
    return tagData, tagIDs; 
};

function CreateTag({app, userTags, setUserTags, isLoading, userInfo, setIsLoggedIn, isLoggedIn, setUserInfo}){

    const navigate = useNavigate();
    const [postData, setPostData] = useState([]); 
    const [tagData, setTagData] = useState([]);
    const [postSuccesful, setPostSucessful] = useState(false); 

    useEffect(() => {
        if (!app) return;
        queryData(app).then(setPostData);
        tagQueryData(app).then(setTagData);
    
    }, [app]);

    const createPost = useCallback(
       async (e) => {
            e.preventDefault(); 
            const db = getFirestore(app);
            const storage = getStorage();

            const caption = e.currentTarget.caption.value; 
            const userName = userInfo.displayName;
            const userID = userInfo.uid; 
            const tagName = e.currentTarget.tags.value;
        

            console.log(e); 

            //Getting all the info we need for the posts
            try{
                const docRef = await addDoc(collection(db, "posts"), {
                    caption,
                    userID: userID,
                    userName, 
                    tagName, 
                }); 

                //Issue: I don't know how to identify posts with specific tagName
                //How do I store the IDs of the new document?
                
                  const tagRef = await addDoc(collection(db, "tags"), {
                    tagName: tagName, 
                  }); 


                setPostSucessful(true); 

                navigate("/dashboard/:id");

            }
            catch (e){
                console.log("Error adding document: ",  e);
            }

        
    },  [app, userInfo, userTags]); 

    const createTag = useCallback(

        async (e) => {
            e.preventDefault(); 
            const db = getFirestore(app);
            const storage = getStorage();

            //This function should check to see if that tag name already exists
            //If it does, we want to add it to the array of tags

            try{
                
            
                setPostSucessful(true); 

            }
            catch (e){
                console.log("Error adding document: ",  e);
            }
            

        }

        /*

           setUserTags(userID); 
    
                const tagRef = await addDoc(collection(db, "tags"), {
                    tagName: tagName, 
                    postIds: userTags,
                });
        */

, [app, userTags])



    useEffect(() =>  {
        if(!isLoggedIn && !isLoading) navigate("/login");
    }, [isLoading, isLoggedIn, navigate]); 


    
    return(
        <div className='createTag'>
            <div className="createTagContent">
                <div className="createTagHeader">
                    <h1>Welcome to </h1> 
                    <h1 style={{color: '#05BC74'}}> tagit!</h1>
                </div>
                <section className='createTagBody'>
                <h2>What's on your mind?</h2>
                    <WritePost  
                            createPost= {createPost}
                            setUserInfo = {setUserInfo}
                            userInfo = {userInfo}
                            createTag = {createTag}
                        />
                </section>
            </div>
        </div>
    );

}

export default CreateTag; 