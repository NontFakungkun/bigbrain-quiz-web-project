import React from 'react';
import { MainPath } from '../utils/Path';

const RegisterScreen = () => {
  return (
    <div>
        <h1>Register</h1>
        <p>Name</p>
        <input type="text" />
        <p>Email</p>
        <input type="text" />
        <p>Password</p>
        <input type="password" />
        <p>Confirm Password</p>
        <input type="password" />
        <br />
        <button> Register </button>
        <a href={MainPath.LOGIN}>
            to Login Page
        </a>
    </div>
  );
};

export default RegisterScreen;
