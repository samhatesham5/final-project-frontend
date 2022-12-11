import React from 'react';
import CreateTag from '../pages/CreateTag';
import TagForm from './TagForm';

function WritePost({createPost, userInfo, setUserInfo}){

    {/* This is the issue.. two on submits and idk how to make it work*/}
    return(
        <div>
            <form className='FormElement' onSubmit={(e) => createPost(e)}>
            <label htmlFor="caption">Write a caption</label>
            <input type="text" name="caption"/>
            <label htmlFor="tags">Add create tag</label>
             <input type = "tags" name="tags"/>
            <button type="submit" className='writePostButton button'>Submit</button>
             </form>
        </div>
    );

}

export default WritePost; 