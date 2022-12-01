import React from 'react';

function LoginForm(){

    return(
        <form className="FormElement" onSubmit={(e) => loginUser(e)}>
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

export default LoginForm; 