import React from 'react';
import { Link } from 'react-dom'; 

function Post({postData, caption, imageAlt, imageSrc, displayName, userId }){
    //We'll need the user's info because this is how we'll display it in an individual post
    //Probably have to map through each post a user has

    return(
        <div className= "postWrapper">
            <p Link to={`user/${postData.displayName}`}>{postData.displayName}</p>
            <img src={imageSrc} alt={imageAlt}/>
            <p className="Caption">{caption}</p>
        </div>
    );

}

export default Post; 