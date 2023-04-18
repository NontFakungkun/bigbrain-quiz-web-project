import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import EditGameScreen from './EditGameScreen';
import { BrowserRouter } from 'react-router-dom';

describe('Edit Game Screen', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <EditGameScreen />
      </BrowserRouter>
    );
  });

  it('displays the EditGameScreen details', () => {
    expect(screen.getByRole('heading', { name: /Edit Game:/i })).toBeInTheDocument();
    expect(screen.getByAltText(/Thumbnail of the game/i)).toBeInTheDocument();
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
  });
  it('displays the back and logout buttons', () => {
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Edit Game Details/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create New Question/i })).toBeInTheDocument();
  });
});
