import React from 'react';
import { MainPath } from '../utils/Path';

const LoginScreen = () => {
  return (
    <div>
        <h1>Login</h1>
        <p>Email</p>
        <input type="text" />
        <p>Password</p>
        <input type="password" />
        <br />
        <button> Login </button>
        <a href={MainPath.REGISTER}>
            to Register Page
        </a>
    </div>
  );
};

export default LoginScreen;
