import React from 'react';

function WritePost({createPost, userInfo, setUserInfo}){

    {/* This is the issue.. two on submits and idk how to make it work*/}
    return(
        <form className='FormElement' onSubmit={(e) => createPost(e)}>
            <label htmlFor="caption">Write a caption</label>
            <input type="text" name="caption" className="formInput"/>
            <label htmlFor="tags">Add create tag</label>
             <input type = "tags" name="tags" className="formInput"/>
            <button type="submit" className='writePostButton button'>Submit</button>
            </form>
    );

}

export default WritePost; 