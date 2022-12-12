import React from 'react';

function SignUpForm({signUpUser}){

    return (
        <form className="FormElement" onSubmit={(e) => signUpUser(e)} >
            {/*Email label*/}
            <label htmlFor="email">Email</label>
            <input type="text" name="email"/>
            {/*Password label*/}
            <label htmlFor="name">Username</label>
            <input type="text" name="name"/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password"/> 
            <button type="submit" className='button'>Submit</button>
        </form>
    );

}

export default SignUpForm; 