import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchRequest from '../utils/fetchRequest';
import Button from '@mui/material/Button';
import CopyToClipboardBtn from '../components/CopyToClipboardBtn';
import ResultTable from '../components/ResultTable';
import ResultBarChart from '../components/ResultBarChart';
import { MainPath } from '../utils/Path';

const ResultScreen = () => {
  const { quizzId, sessionId } = useParams();
  const [isPressed, setisPressed] = React.useState(false);
  const [players, setPlayers] = React.useState([])
  const [sessionStatus, setSessionStatus] = React.useState(false);
  const navigate = useNavigate();

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
          <Button variant='contained' onClick={() => { advanceToNextQuestion(quizzId); setisPressed(!isPressed); }}>Advance to next question </Button> <br />
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
          <ResultTable sessionId={ sessionId } ></ResultTable>
          <ResultBarChart ></ResultBarChart>
        </>
      )}
    </>
  )
}

export default ResultScreen
