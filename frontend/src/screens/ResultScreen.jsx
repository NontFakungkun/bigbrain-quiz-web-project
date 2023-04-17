import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchRequest from '../utils/fetchRequest';
import Button from '@mui/material/Button';

const ResultScreen = () => {
  const { currentQuizzId } = useParams();
  const [sessionIsActive, setSessionIsActive] = React.useState(false);
  const [stopIsPressed, setStopIsPressed] = React.useState(false);

  useEffect(async () => {
    const quizData = await fetchRequest({}, 'GET', `/admin/quiz/${currentQuizzId}`)
    fetchRequest({}, 'GET', `/admin/session/${quizData.active}/status`)
      .then(data => { setSessionIsActive(data.results.active) })
      .catch(() => {
        setSessionIsActive(false);
      });
  }, [stopIsPressed])

  const stopGame = (quizId) => {
    const payload = {
      quizid: { quizId },
    }
    fetchRequest({ payload }, 'POST', `/admin/quiz/${quizId}/end`);
  }

  const advanceToNextQuestion = (quizId) => {
    const payload = {
      quizid: { quizId },
    }
    fetchRequest({ payload }, 'POST', `/admin/quiz/${quizId}/advance`);
  }

  return (
    <>
      {sessionIsActive && (
        <>
          Game hasn&apos;t finished <br />
          <Button variant='contained' onClick={() => advanceToNextQuestion(currentQuizzId)}>Advance to next question</Button> <br />
          <Button variant='contained' onClick={() => { stopGame(currentQuizzId); setStopIsPressed(true); }}>Stop the game</Button>
        </>
      )}

      {!sessionIsActive && (
        <>
          Result bro
          {/* table of top 5 and their score */}

          {/* bar chart */}
          {/* average response/answer time */}
        </>
      )}
    </>
  )
}

export default ResultScreen
