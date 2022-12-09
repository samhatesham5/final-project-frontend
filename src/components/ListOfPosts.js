//Look at the article list exercise for how to do this
import React from 'react';
import Post from './Post';

{/* Will I need to pass a tag into here so that way we can iterate? */}
function ListOfPosts({ postData }){
    return(
        <div>
            {/* Mapping over posts */}
            {postData.map((post) => (
                <Post 
                    caption = {post.caption}
                    imageAlt = {post.imageAlt}
                    imageURL = {post.imageURL}
                    userID = {post.userID}
                    userName = {post.userName}
                />
            ))}
        </div>
    );

}

export default ListOfPosts; 