import React from 'react';
import './css/LoginScreen.css'
import { useNavigate } from 'react-router-dom';
import { MainPath } from '../utils/Path';
import fetchRequest from '../utils/fetchRequest';

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Authenticate user with credentials
    const payload = {
      email: email,
      password: password,
    }
    fetchRequest(payload, 'POST', '/admin/auth/login')
      .then((data) => {
        localStorage.setItem('token', data.token);
        navigate(MainPath.DASHBOARD)
      }).catch((error) => {
        setErrorMessage(error)
        setPassword('')
      });
  }

  return (
    <div className='login-background'>
      <div className='login-page'>
        <h1>Login</h1>
        <p className='login-desc'>Please login with your credentials</p>
          <form>
            <input type="text" className='input-box' placeholder='Enter your email' value={email} onChange={(event) => { setEmail(event.target.value) }}/>
            <input type="password" className='input-box' placeholder='Enter your password' value={password} onChange={(event) => { setPassword(event.target.value) }}/>

            <p className='error-message'>{errorMessage}</p>
            <a className='register-link' href={MainPath.REGISTER}>
              to Register page
            </a>
            <div className='login-btn'>
              <button className='btn-primary' onClick={ handleSubmit }> Login </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
