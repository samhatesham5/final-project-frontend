import React from 'react';

function SignUpForm({signUpUser}){

    return (
        <form className="FormElement" onSubmit={(e) => signUpUser(e)} >
            {/*Email label*/}
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="formInput"/>
            {/*Password label*/}
            <label htmlFor="name">Username</label>
            <input type="text" name="name" className="formInput"/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="formInput"/> 
            <button type="submit" className='writePostButton button'>Submit</button>
        </form>
    );

}

export default SignUpForm; 