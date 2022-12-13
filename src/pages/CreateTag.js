import React, {useState, useEffect, useCallback} from 'react';
import WritePost from '../components/WritePost';

import { addDoc, getDocs, getFirestore, collection, updateDoc, query, where } from "firebase/firestore"; 
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

            const caption = e.currentTarget.caption.value; 
            const userName = userInfo.displayName;
            const userID = userInfo.uid; 
            const tagName = e.currentTarget.tags.value;

            //We're coming up with our own value for the postID; postIDsPlaceholder will store them before passing back
            var postID = index;
            var postIDsPlaceholder = [];
            
            console.log(e); //ISSUE: DELETE


            //Getting all the info we need for the posts
            try{
                
                //--- Creating a post---
                
                 await addDoc(collection(db, "posts"), {
                    caption,
                    userID: userID,
                    userName, 
                    tagName, 
                    postID: postID,  
                }); 
                
                //--- Creating our tags ---
                const tagRef = await getDocs(collection(db, "tags"));

                //Stores all the tag data into temp (we'll use it to compare tagNames later)
                const temp = []; 
                //When we finally find the tagName, we'll store it in here
                var foundTag = '';

                tagRef.forEach(async (tag) => {
                    temp.push([tag.id, tag.data()]); 
                });

                //Checking to see if that tagName is in there
                const inTag = temp.some(element => {
                    console.log(temp); 
                    if(element[1].tagName === tagName) {
                        //Storing that specific tagName
                       foundTag = element[1].tagName;
                       //Storing the values of postIDs
                        postIDsPlaceholder = element[1].postIDs;
                        return true;
                    }
                    else{
                        //If our tagName is not in there, set to an empty array
                        postIDsPlaceholder = []; 
                        return false
                    }
                });
                
                //Add previous values (or empty array) to our postIds array
                postIDsPlaceholder.push(postID);
     
                //If the value we entered is not inside our tag database, add a new tag
                if (!inTag) {
                    await addDoc(collection(db, "tags"), {
                        name: tagName, 
                        tagName: tagName,
                        postIDs: [...postIDsPlaceholder],
                     }); 
                }
                else {
                    //If our tag already exists, we update the tags postIDs with the new id in there
                    //const tagNameSnap= await getDocs(collection(db, "tags"));
                    const tagNameQuery = query(collection(db, "tags"), where("tagName", "==", foundTag));
                    const tagNameGet = await getDocs(tagNameQuery);
                    
                    var tagNameRef;

                    tagNameGet.forEach((doc) => {
                        tagNameRef = doc.ref; 
                        return tagNameRef; 
                    })
                    await updateDoc(tagNameRef, { 
                        //Maybe just create a whole new array and just add to that and toss it in here
                        postIDs: [...postIDsPlaceholder], 
                    }); 
                }
            
                //Increase index (so that we can keep increaseing postID num)
                setIndex(index++);
                setPostSucessful(true); 
                navigate("/dashboard/:id");

            }
            catch (e){
                console.log("Error adding document: ",  e);
            }

        
    },  [app, userInfo, index, navigate]); 

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
                        />
                </section>
            </div>
        </div>
    );

}

export default CreateTag; 