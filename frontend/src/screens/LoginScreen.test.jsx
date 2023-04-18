import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import LoginScreen from './LoginScreen';
import { BrowserRouter } from 'react-router-dom';

describe('Login Screen', () => {
  it('displays details correctly', () => {
    render(
      <BrowserRouter>
        <LoginScreen/>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', {
      name: /login/i
    })).toBeInTheDocument();
    expect(screen.getByText('Please login with your credentials')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /to register page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
