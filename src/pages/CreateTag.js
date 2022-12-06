import React from 'react';

function CreateTag(){
    
    return(
        <div className='createTag'>
            <div className="createTagContent">
                <div className="createTagHeader">
                    <h1>Welcome to </h1> 
                    <h1 style={{color: '#05BC74'}}> tagit!</h1>
                </div>
                <section className='createTagBody'>
                    <p>Please create 3 tags for your dashboard to get started.</p>
                    <form className = "createForm">
                        <input type="text" name="tags" className="createTagInput"/>
                        <button type="submit" className='createButton button'>Submit</button>
                    </form>
                </section>
            </div>
        </div>
    );

}

export default CreateTag; 