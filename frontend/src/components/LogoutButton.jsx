import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainPath } from '../utils/Path';
import fetchRequest from '../utils/fetchRequest';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const navigate = useNavigate()

  const logoutSubmit = (event) => {
    event.preventDefault();
    fetchRequest({}, 'POST', '/admin/auth/logout')
      .then((data) => {
        localStorage.removeItem('token');
        navigate(MainPath.LOGIN);
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
        <Button variant="outlined" size='small' name='logout-btn' onClick={logoutSubmit}> Logout </Button>
    </div>
  );
};

export default LogoutButton;
