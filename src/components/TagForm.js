import React from 'react'; 

function TagForm({CreateTag}){
    return(
        <form className='FormElement' onSubmit={(e) => CreateTag(e)} >
             <label htmlFor="tags">Add create tag</label>
             <input type = "tags" name="tags"/>
        </form>
    );
}

export default TagForm; 