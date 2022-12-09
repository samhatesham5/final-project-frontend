import React from 'react';

function SignUpForm({signUpUser}){

    return (
        <form className="FormElement" onSubmit={(e) => signUpUser(e)} >
            {/*Email label*/}
            <label htmlFor="email">Email</label>
            <input type="text" name="email"/>
            <label htmlFor="name">Username</label>
            <input type="text" name="name"/>
            {/*Password label*/}
            <label htmlFor="password">Password</label>
            <input type="password" name="password"/> 
            <button type="submit">Submit</button>
        </form>
    );

}

export default SignUpForm; 