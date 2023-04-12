import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainPath } from '../utils/Path';

const LogoutButton = () => {
  const navigate = useNavigate()

  const logoutSubmit = (event) => {
    event.preventDefault()
    localStorage.removeItem('token')
    navigate(MainPath.LOGIN)
  }

  return (
    <div>
        <button name='logout-btn' onClick={logoutSubmit}> Logout </button>
    </div>
  );
};

export default LogoutButton;
