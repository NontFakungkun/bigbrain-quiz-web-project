import React from 'react';
import { MainPath } from '../utils/Path';
import { useParams } from 'react-router-dom';
import fetchRequest from '../utils/fetchRequest';

const PlaygroundScreen = () => {
  const { quizId } = useParams();

  const startGame = () => {
    fetchRequest({}, 'POST', `/admin/quiz/${quizId}/start`)
      .then(() => {
        console.log(`${quizId} started`);
        localStorage.setItem('myapp_test', 0);
      });
  }
  const advanceGame = () => {
    fetchRequest({}, 'POST', `/admin/quiz/${quizId}/advance`)
      .then(() => {
        console.log(`${quizId} advanced`)
        localStorage.setItem('myapp_test', Number(localStorage.getItem('myapp_test')) + 1);
      });
  }
  const stopGame = () => {
    fetchRequest({}, 'POST', `/admin/quiz/${quizId}/end`)
      .then(() => {
        console.log(`${quizId} ended`);
        localStorage.removeItem('myapp_test');
      });
  }
  return (
    <div>
        <h1>Playground</h1>
        <h4>Put anything you want to test here</h4>
        <a href={MainPath.LOGIN}>
          to Login Page
        </a>
        <a href={MainPath.DASHBOARD}>
          to Dashboard
        </a>
        <br />
        <br />
        Quiz ID: {quizId}
        <button onClick={ startGame }> Start </button>
        <button onClick={ advanceGame }> Advance </button>
        <button onClick={ stopGame }> Stop </button>
    </div>

  );
};

export default PlaygroundScreen;
