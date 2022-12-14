import React from 'react';

function LoginForm({loginUser}) {

    return(
            <form className="FormElement" onSubmit={(e) => loginUser(e)}>
                {/*UserName label*/}
                <label htmlFor="email">Email</label>
                <input type="text" name="email"className="formInput"/>
                {/*Password label*/}
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="formInput"/> 
                <button type="submit" className='writePostButton button'>Submit</button>
        </form>
    );

}

export default LoginForm; 