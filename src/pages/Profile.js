import React from 'react';
import { Link } from 'react-router-dom';

function Profile({userInfo}){
    return(
        <div className = "profileWrapper">
                <h2>tagit</h2>
            <div className = "profileText">
                <h2>User Info</h2>
                <p>Username: {userInfo.displayName}</p>
                <p>Email: {userInfo.email}</p>
                <Link to="/dashboard/:id" className = "profileDash">Back to Dashboard</Link>
            </div>
        </div>
    );
}

export default Profile; 