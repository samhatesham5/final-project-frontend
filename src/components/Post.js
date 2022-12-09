import React from 'react';
import { Link } from 'react-dom'; 

function Post({ caption, imageAlt, imageURL, userName, userID, userInfo }){
    //We'll need the user's info because this is how we'll display it in an individual post
    //Probably have to map through each post a user has

    return(
        <div className= "postWrapper">
            <p link to={`user/${userID}`}>{userName}</p>
            <img src={imageURL} alt={imageAlt}/>
            <p className="Caption">{caption}</p>
        </div>
    );

}

export default Post; 