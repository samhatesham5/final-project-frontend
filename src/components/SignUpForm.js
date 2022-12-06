import React from 'react';

function SignUpForm({signUpUser}){

    return (
        <form className="FormElement" onSubmit={(e) => signUpUser(e)} >
            {/*UserName label*/}
            <label htmlFor="email">Email</label>
            <input type="text" name="email"/>
            {/*Password label*/}
            <label htmlFor="password">Password</label>
            <input type="password" name="password"/> 
            <button type="submit">Submit</button>
        </form>
    );

}

export default SignUpForm; 