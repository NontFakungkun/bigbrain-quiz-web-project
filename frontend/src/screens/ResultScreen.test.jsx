import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ResultScreen from './ResultScreen';
import { BrowserRouter } from 'react-router-dom';

describe('Result Screen', () => {
  it('displays details correctly', () => {
    render(
      <BrowserRouter>
        <ResultScreen/>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', {
      name: /Result/i
    })).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Point for each question will be calculated as (1 + (remaining time in percentage * scaling rate))points')).toBeInTheDocument();
    expect(screen.getByText('Note: scaling is a number between 0 to 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
  });
});
