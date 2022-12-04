import React from 'react';

function DashNav(){

    return(
        <div>
            <div className='userBlurb'>
                <p>default icon</p>
                {/*They can't sign in with username but this is what's displayed */}
                <p>Username</p>
            </div>
            <p>Your Posts</p>
            <p>Tags</p>
            <div className='tags'>
                {/*Can be done by mapping over the array of tags, right? */}
                <p>Tag 1</p>
                <p>Tag 2</p>
                <p>Tag 3</p>
            </div>
            <p>Exit Out</p>
        </div>
    );

}

export default DashNav; 