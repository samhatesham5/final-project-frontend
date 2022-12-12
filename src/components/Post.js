import React from 'react';
import { Link } from 'react-dom'; 

function Post({ caption, imageAlt, imageURL, userName, userID, userTags}){
    //We'll need the user's info because this is how we'll display it in an individual post
    //Probably have to map through each post a user has

    return(
        <div className= "postWrapper">
            <div className='postUser'> 
                <img src ="https://github.com/samhatesham5/final-project-frontend/blob/main/src/assets/user.png?raw=true" alt="user icon" />
                <p link to={`user/${userID}`}>{userName}</p>
            </div>
            <hr />
            <div className='postCaption'>
                <p className="caption">{caption}</p>
                <p>Tag: {userTags}</p>
            </div>
        </div>
    );

}

export default Post; 