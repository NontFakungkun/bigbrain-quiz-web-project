import React from 'react';
import './css/RegisterScreen.css'
import { MainPath } from '../utils/Path';
import { useNavigate } from 'react-router-dom';
import fetchRequest from '../utils/fetchRequest';
import { Button } from '@mui/material';

const RegisterScreen = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Authenticate user with credentials
    if (!name) {
      setErrorMessage('Enter name');
    } else if (!email) {
      setErrorMessage('Enter email');
    } else if (!password) {
      setErrorMessage('Enter password');
    } else if (password !== confirmPassword) { // Check if the passwords match
      setErrorMessage('The passwords don\'t match');
      setConfirmPassword('');
    } else {
      const payload = {
        name,
        email,
        password,
      }
      fetchRequest(payload, 'POST', '/admin/auth/register')
        .then((data) => {
          localStorage.setItem('token', data.token);
          navigate(MainPath.DASHBOARD);
        }).catch((error) => {
          setErrorMessage(error);
        });
    }
  }

  return (
    <div className='register-background'>
      <div className='register-page'>
        <h1>Register</h1>
        <p className='register-desc'>Register to create an account</p>
          <form>
            <label htmlFor="name-input">Name</label>
            <input type="text" className='input-box' id='name-input' value={name} onChange={(event) => { setName(event.target.value) }}/>
            <label htmlFor="email-input">Email</label>
            <input type="text" className='input-box' id='email-input' value={email} onChange={(event) => { setEmail(event.target.value) }}/>
            <label htmlFor="password-input">Password</label>
            <input type="password" className='input-box' id='password-input' value={password} onChange={(event) => { setPassword(event.target.value) }}/>
            <label htmlFor="confirm-pass-input">Confirm Password</label>
            <input type="password" className='input-box' id='confirm-pass-input' value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }}/>

            <p className='error-message'>{errorMessage}</p>
            <a className='login-link' href={MainPath.LOGIN}>
              to Login page
            </a>
            <div className='register-btn'>
              <Button variant="contained" size='small' className='btn-primary' onClick={ handleSubmit }> Register </Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
