import React from 'react';

function WritePost({createPost, userInfo, setUserInfo}){

    return(
        <form className='FormElement' onSubmit={(e) => createPost(e)}>
            <label htmlFor="caption">caption</label>
            <input type="text" name="caption"/>
            <input type = "tags" name="tags"/>
            <button type="submit">Submit</button>

        </form>
    );

}

export default WritePost; 