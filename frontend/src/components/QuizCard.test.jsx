import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import QuizCard from './QuizCard';
import { BrowserRouter } from 'react-router-dom';

describe('Quiz Card', () => {
  const handleOpen = jest.fn();
  const setIsTryStartGame = jest.fn();
  const setIsTryDeleteGame = jest.fn();
  const startGame = jest.fn();
  const fetchQuizzes = jest.fn();
  const stopGame = jest.fn();
  const quiz = {
    id: 1,
    createdAt: '2020-10-31T14:45:21.077Z',
    name: 'Test Quiz',
    owner: 'lol@email.com',
    active: 123456,
    oldSessions: [4545546],
    thumbnail: 'data:image/png;,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    totalTime: '1:30',
    qnum: 10,
  };
  it('displays image correctly', () => {
    render(
      <BrowserRouter>
        <QuizCard quiz={quiz} handleOpen={handleOpen} setIsTryStartGame={setIsTryStartGame} setIsTryDeleteGame={setIsTryDeleteGame} startGame={startGame} fetchQuizzes={fetchQuizzes} stopGame={stopGame} />
      </BrowserRouter>
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', quiz.thumbnail);
    expect(screen.getByRole('img')).toHaveAttribute('alt', `Thumbnail of Quiz:${quiz.name} by ${quiz.owner} created at ${quiz.createdAt}`);
  });
  it('displays quiz details correctly', () => {
    render(
      <BrowserRouter>
        <QuizCard quiz={quiz} handleOpen={handleOpen} setIsTryStartGame={setIsTryStartGame} setIsTryDeleteGame={setIsTryDeleteGame} startGame={startGame} fetchQuizzes={fetchQuizzes} stopGame={stopGame} />
      </BrowserRouter>
    );
    expect(screen.getByText(quiz.name)).toBeInTheDocument();
    expect(screen.getByText(`${quiz.qnum} Questions - ${quiz.totalTime} Minutes`)).toBeInTheDocument();
    expect(screen.getByText(`Active session: ${quiz.active}`)).toBeInTheDocument();
  });
  it('displays buttons correctly', () => {
    render(
      <BrowserRouter>
        <QuizCard quiz={quiz} handleOpen={handleOpen} setIsTryStartGame={setIsTryStartGame} setIsTryDeleteGame={setIsTryDeleteGame} startGame={startGame} fetchQuizzes={fetchQuizzes} stopGame={stopGame} />
      </BrowserRouter>
    );
    expect(screen.getByText(/edit game/i)).toBeInTheDocument();
    expect(screen.getByText(/upload data/i)).toBeInTheDocument();
    expect(screen.getByText(/start game/i)).toBeInTheDocument();
    expect(screen.getByText(/delete game/i)).toBeInTheDocument();
  });

  it('displays quiz with some blank or wrong details correctly', () => {
    const nullQuiz = {
      id: 1,
      createdAt: '2021-01-29T14:45:21.077Z',
      name: 'Test Quiz2',
      owner: 'eiei@email.com',
      active: null,
      oldSessions: [2134565],
      thumbnail: 'lol.jpg',
      totalTime: '0:30',
      qnum: 5,
    };

    render(
      <BrowserRouter>
        <QuizCard quiz={nullQuiz} handleOpen={handleOpen} setIsTryStartGame={setIsTryStartGame} setIsTryDeleteGame={setIsTryDeleteGame} startGame={startGame} fetchQuizzes={fetchQuizzes} stopGame={stopGame} />
      </BrowserRouter>
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', nullQuiz.thumbnail);
    expect(screen.getByRole('img')).toHaveAttribute('alt', `Thumbnail of Quiz:${nullQuiz.name} by ${nullQuiz.owner} created at ${nullQuiz.createdAt}`);
    expect(screen.getByText(nullQuiz.name)).toBeInTheDocument();
    expect(screen.getByText(`${nullQuiz.qnum} Questions - ${nullQuiz.totalTime} Minutes`)).toBeInTheDocument();
    expect(screen.getByText('Active session: None')).toBeInTheDocument();
    expect(screen.getByText(/edit game/i)).toBeInTheDocument();
    expect(screen.getByText(/upload data/i)).toBeInTheDocument();
    expect(screen.getByText(/start game/i)).toBeInTheDocument();
    expect(screen.getByText(/delete game/i)).toBeInTheDocument();
  });
});
