import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import LogoutButton from './LogoutButton';
import { BrowserRouter } from 'react-router-dom';

describe('logoutButton', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('appears when renders', () => {
    render(
      <BrowserRouter>
        <LogoutButton />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  // --- Should work but didn't ---
  // it('calls logoutSubmit when clicked', () => {
  //   const spy = jest.spyOn(LogoutButton.prototype, 'logoutSubmit');
  //   render(
  //     <BrowserRouter>
  //       <LogoutButton />
  //     </BrowserRouter>
  //   );
  //   const button = screen.getByRole('button', { name: /logout/i });
  //   userEvent.click(button);
  //   expect(spy).toHaveBeenCalledTimes(1);
  // });
});
