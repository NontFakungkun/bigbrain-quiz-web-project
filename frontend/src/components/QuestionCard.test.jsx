import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionCard from './QuestionCard';
import { BrowserRouter } from 'react-router-dom';

describe('QuestionCard', () => {
  const mockQuestion = {
    id: 1,
    title: 'Q1',
    type: 'single',
    timeLimit: 20,
    points: 5,
    media: 'https://youtubevideo.com',
    choices: ['A', 'B', 'C'],
    answer: [1],
  };

  const mockQuizId = 1111;
  const mockDeleteQuestion = jest.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <QuestionCard quizId={mockQuizId} question={mockQuestion} deleteQuestion={mockDeleteQuestion} />
      </BrowserRouter>
    );
  });

  it('displays question details correctly', () => {
    expect(screen.getByText(`Q.${mockQuestion.id}: ${mockQuestion.title}`)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${mockQuestion.type}`)).toBeInTheDocument();
    expect(screen.getByText(`Time Limit: ${mockQuestion.timeLimit}`)).toBeInTheDocument();
    expect(screen.getByText(`Points: ${mockQuestion.points}`)).toBeInTheDocument();
    expect(screen.getByText(`Video URL: ${mockQuestion.media}`)).toBeInTheDocument();
    expect(screen.getByText(`Choices: ${mockQuestion.choices.join(', ')}`)).toBeInTheDocument();
    expect(screen.getByText(`Answer ID(s): ${mockQuestion.answer.join(', ')}`)).toBeInTheDocument();
  });

  it('displays edit and delete buttons', async () => {
    expect(screen.getByText(/edit question/i)).toBeInTheDocument();
    expect(screen.getByText(/delete question/i)).toBeInTheDocument();
  });
});
