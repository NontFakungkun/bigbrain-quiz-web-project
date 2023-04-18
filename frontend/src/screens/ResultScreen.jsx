import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchRequest from '../utils/fetchRequest';
import Button from '@mui/material/Button';
import CopyToClipboardBtn from '../components/CopyToClipboardBtn';
import ResultTable from '../components/ResultTable';
import ResultBarChart from '../components/ResultBarChart';
import { MainPath } from '../utils/Path';
import advanceScoreCalculation from '../utils/advanceScoreCalculation';

const ResultScreen = () => {
  const { quizzId, sessionId } = useParams();
  const [isPressed, setisPressed] = React.useState(false);
  const [sessionStatus, setSessionStatus] = React.useState(false);
  const [players, setPlayers] = React.useState([])
  const [pointDataArray, setPointDataArray] = React.useState([])
  const [rows, setRows] = React.useState([])
  const navigate = useNavigate();

  useEffect(() => {
    setRows([]);
    fetchRequest({}, 'GET', `/admin/quiz/${quizzId}`)
      .then(data => {
        const pointData = data.questions.map(question => {
          return { points: question.points, timeLimit: question.timeLimit }
        })
        console.log(pointData)
        setPointDataArray(pointData);
      });
  }, []);

  useEffect(() => {
    fetchRequest({}, 'GET', `/admin/session/${sessionId}/results`)
      .then(data => {
        console.log(data);
        data.results.forEach(player => {
          let score = 0.0;
          player.answers.forEach((answer, index) => {
            if (answer.correct && pointDataArray) {
              const startTime = new Date(answer.questionStartedAt).getTime();
              const answerTime = new Date(answer.answeredAt).getTime();
              console.log(pointDataArray[index])
              console.log(index)
              score += advanceScoreCalculation(pointDataArray[index].timeLimit, pointDataArray[index].points, startTime, answerTime);
            }
          })
          const newRows = [...rows, { name: player.name, score }];
          setRows(newRows);
        })
      })
      .catch('session still active');
  }, [pointDataArray])

  useEffect(() => {
    fetchRequest({}, 'GET', `/admin/session/${sessionId}/status`)
      .then(data => {
        setPlayers(data.results.players);
        setSessionStatus(data.results.active);
      })
      .catch((error) => {
        console.error('cant get status ' + error)
      });
  }, [isPressed])

  const stopGame = (quizId) => {
    const payload = {
      quizid: { quizId },
    }
    fetchRequest({ payload }, 'POST', `/admin/quiz/${quizId}/end`).then(() => {
      console.log(`${quizId} ended`);
      localStorage.setItem(sessionId, 10000);
      localStorage.removeItem(sessionId);
    });
  }

  const advanceToNextQuestion = (quizId) => {
    const payload = {
      quizid: { quizId },
    }
    fetchRequest({ payload }, 'POST', `/admin/quiz/${quizId}/advance`).then(() => {
      console.log(`${quizId} advanced`)
      localStorage.setItem(sessionId, Number(localStorage.getItem(sessionId)) + 1);
    });
  }

  const getPlayer = () => {
    return <>
      {players.map(player => <p key={player}>{player}</p>)}
    </>
  }

  return (
    <>
      {sessionStatus && (
        <>
          Game hasn&apos;t finished <br />
          <Button variant="outlined" size='small' style={{ float: 'right' }} onClick={() => navigate(MainPath.DASHBOARD)}> Back </Button><br />
          <Button variant='contained' onClick={() => { advanceToNextQuestion(quizzId); setisPressed(!isPressed); }}>Advance to next question</Button> <br />
          <Button variant='contained' onClick={() => { stopGame(quizzId); setisPressed(!isPressed); }}>Stop the game</Button> <br />
          <CopyToClipboardBtn value={`http://${window.location.host}/joingame/${sessionId}`}>Copy</CopyToClipboardBtn>
          <p>Current Players: </p>
          { getPlayer() }
        </>
      )}

      {!sessionStatus && (
        <>
          <h2>Results🎉</h2>
          <Button variant="outlined" size='small' style={{ float: 'right' }} onClick={() => navigate(MainPath.DASHBOARD)}> Back </Button><br />
          <p> Point for each question will be calculated as (1 + (remaining time in percentage * scaling rate))points </p>
          <p> Note: scaling is a number between 0 to 1 </p>
          <ResultTable rows={ rows } ></ResultTable>
          <ResultBarChart ></ResultBarChart>
        </>
      )}
    </>
  )
}

export default ResultScreen
