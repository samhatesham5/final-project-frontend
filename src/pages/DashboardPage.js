import React from 'react';
import DashNav from '../components/DashNav';
import FindFriends from '../components/FindFriends';
import ListOfPosts from '../components/ListOfPosts';
import WritePost from '../components/WritePost';

function DashboardPage( {isLoggedIn, setIsLoggedIn, isLoading, userInfo, setUserInfo}){

    return(
        <div>
            <h1>Dashboard</h1> 
            {/* UserSection */}
            <section className='userSection'>
                <div className='dashUser'> 
                    <DashNav 
                        isLoggedIn = {isLoggedIn}
                        setIsLoggedIn = {setIsLoggedIn}
                        isLoading = {isLoading}
                        userInfo = {userInfo}
                        setUserInfo = {setUserInfo}
                    /> 
                </div>
            </section>
            {/*Main */}
            <section className='mainContent'>
                <div className='searchBar'> 
                    <form className='searchForm'>
                        <input type="text" placeholder='search'/> 
                        <button type="submit">Icon</button>
                    </form>
                </div>
                <div>
                    <WritePost />
                </div>
                {/* We'll revisit this because if you search for friends, different component shows up there*/}
                <div className='dashContent'>
                    {/* Will store all of our posts and map over them */}
                    <listOfPosts/>
                    <FindFriends /> 
                </div>
            </section>
            {/* Should only be one account there */}
            <section className=''>
                <p>Placeholder until we figure something out</p>
            </section>
        </div>
    );

}

export default DashboardPage; 