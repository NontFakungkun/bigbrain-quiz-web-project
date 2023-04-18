import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchRequest from '../utils/fetchRequest';
import Button from '@mui/material/Button';
import CopyToClipboardBtn from '../components/CopyToClipboardBtn';
import ResultTable from '../components/ResultTable';
import ResultBarChart from '../components/ResultBarChart';

const ResultScreen = () => {
  const { quizzId, sessionId } = useParams();
  const [isPressed, setisPressed] = React.useState(false);
  const [players, setPlayers] = React.useState([])
  const [sessionStatus, setSessionStatus] = React.useState(false);

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
    fetchRequest({ payload }, 'POST', `/admin/quiz/${quizId}/end`);
  }

  const advanceToNextQuestion = (quizId) => {
    const payload = {
      quizid: { quizId },
    }
    fetchRequest({ payload }, 'POST', `/admin/quiz/${quizId}/advance`);
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
          <ResultTable sessionId={ sessionId } ></ResultTable>
          <ResultBarChart ></ResultBarChart>
          {/* average response/answer time */}
        </>
      )}
    </>
  )
}

export default ResultScreen
