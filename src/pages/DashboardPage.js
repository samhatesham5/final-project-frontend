import React from 'react';
import DashNav from '../components/DashNav';
import FindFriends from '../components/FindFriends';
import ListOfPosts from '../components/ListOfPosts';
import WritePost from '../components/WritePost';

function DashboardPage(){

    return(
        <div>
            <h1>Dashboard</h1> 
            {/* UserSection */}
            <section className='userSection'>
                <div className='dashUser'> 
                    <DashNav /> 
                </div>
            </section>
            {/*Main */}
            <section className='mainContent'>
                <div className='searchBar'> 
                    <form className='searchForm'>
                        <input type="text" placeholder='search'/> 
                        <button type="submit">icon</button>
                    </form>
                </div>
                <div>
                    <WritePost />
                </div>
                {/* We'll revisit this because if you search for friends, different component shows up there*/}
                <div className='dashContent'>
                    <listOfPosts/>
                    <FindFriends /> 
                </div>
            </section>
            <section className=''>
                <p>Placeholder until we figure something out</p>
            </section>
        </div>
    );

}

export default DashboardPage; 