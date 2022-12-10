import React, {useState, useEffect, useCallback, useMemo} from 'react';
import WritePost from '../components/WritePost';
import DashboardPage from './DashboardPage';

import { addDoc, getDocs, getFirestore, collection, querySnapshot, QuerySnapshot, updateDoc, arrayUnion } from "firebase/firestore"; 
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
   // console.log(postIDs);
    return postData; 
};


function CreateTag({app, userTags, setUserTags, isLoading, userInfo, setIsLoggedIn, isLoggedIn, setUserInfo}){

    const navigate = useNavigate();
    const [postData, setPostData] = useState([]); 
    const [postIDs, setPostIDs] = useState([]);
    var   [index, setIndex] = useState(0); 
    const [postSuccesful, setPostSucessful] = useState(false); 

    useEffect(() => {
        if (!app) return;
        queryData(app).then(setPostData);
       // tagQueryData(app).then(setTagIDs);
    
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
            //We're coming up with our own value for the postID
            //It'll just be a number that increases every time we add a post 
            var postID = index;
        

            console.log(e); 

            //Getting all the info we need for the posts
            try{
                const docRef = await addDoc(collection(db, "posts"), {
                    caption,
                    userID: userID,
                    userName, 
                    tagName, 
                    postID: postID.toString(), 
                }); 

                //postIDs.push(postID.toString());
                setIndex(index += 1); 

                const tagRef = await getDocs(collection(db, "tags"));

                //Stores all the tag data into temp (we'll use it to compare tagNames later)
                const temp = []; 

                tagRef.forEach(async (tag) => { 
                    temp.push(tag.data()); 
                });

                console.log(temp); 

                //Checking to see if that tagName is in there
                const inTag = temp.some(element => {
                    //console.log(temp.data().tagName); 
                    if(element.tagName === tagName) {
                        console.log("it's in there!");
                        return true;
                    }
                    else{
                        console.log("It's not");
                        return false
                    }
                });
                
                if (!inTag) {
                    const newTag = await addDoc(collection(db, "tags"), {
                        tagName: tagName, 
                        postIDs: postIDs.push(postID.toString()),
                     }); 
                }
                else {
                    const tagNameRef = collection(db, "tags", {tagName});
                    const existTag = await updateDoc(tagNameRef, { 
                        postIDs: arrayUnion(postID.toString()), 
                    }); 
                }
            
                setPostSucessful(true); 

               // navigate("/dashboard/:id");

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