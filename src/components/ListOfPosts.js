//Look at the article list exercise for how to do this
import React from 'react';
import Post from './Post';

{/* Will I need to pass a tag into here so that way we can iterate? */}
function ListOfPosts(){

    return(
        <div>
            {/* Mapping over posts */}
            <Post /> 
        </div>
    );

}

export default ListOfPosts; 