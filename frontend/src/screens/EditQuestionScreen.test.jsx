import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import EditQuestionScreen from './EditQuestionScreen'
import { BrowserRouter } from 'react-router-dom';

describe('Edit Question Screen', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
          <EditQuestionScreen />
      </BrowserRouter>
    );
  });

  it('displays all details correctly', () => {
    const currentData = screen.getByRole('columnheader', { name: /current data/i });
    const inputText = screen.getByRole('columnheader', { name: /input/i });
    const titleInput = screen.getByRole('cell', { name: /Title:/i });
    const typeInput = screen.getByRole('cell', { name: /Type \(single\/multiple\):/i });
    const timeLimitInput = screen.getByRole('cell', { name: /Time Limit:/i });
    const pointsInput = screen.getByRole('cell', { name: /Points:/i });
    const videoInput = screen.getByRole('cell', { name: /Video URL:/i });
    const choicesList = screen.getByRole('cell', { name: /Choices:/i });
    const choicesInput = screen.getByRole('cell', { name: /In input text, write new choices separate all choices by ;/i });
    const answerList = screen.getByRole('cell', { name: /Answer ID\(s\):/i });
    const answerInput = screen.getByRole('cell', { name: /Put number i.e. 1 for first choice, write new answer ID\(s\) separate all choices by ;/i });

    expect(currentData).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(timeLimitInput).toBeInTheDocument();
    expect(pointsInput).toBeInTheDocument();
    expect(videoInput).toBeInTheDocument();
    expect(choicesList).toBeInTheDocument();
    expect(choicesInput).toBeInTheDocument();
    expect(answerList).toBeInTheDocument();
    expect(answerInput).toBeInTheDocument();
  });

  it('displays the back and logout buttons', () => {
    const backButton = screen.getByRole('button', { name: /Back/i });
    const editButton = screen.getByRole('button', { name: /Edit Question/i });
    const clearButton = screen.getByRole('button', { name: /Clear/i });
    const logoutButton = screen.getByRole('button', { name: /Logout/i });

    expect(backButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});
