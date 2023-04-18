import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchRequest from '../utils/fetchRequest';
import Button from '@mui/material/Button';
import CopyToClipboardBtn from '../components/CopyToClipboardBtn';
import ResultTable from '../components/ResultTable';

const ResultScreen = () => {
  const { quizzId, sessionId } = useParams();
  const [stopIsPressed, setStopIsPressed] = React.useState(false);
  const [players, setPlayers] = React.useState([])

  useEffect(() => {
    fetchRequest({}, 'GET', `/admin/session/${sessionId}/status`)
      .then(data => {
        console.log(data)
        console.log(quizzId)
        setPlayers(data.results.players);
      })
      .catch((error) => {
        console.error('cant get status ' + error)
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

  const getResult = () => {
    fetchRequest({}, 'GET', `/admin/session/${sessionId}/results`)
      .then(data => {
        console.log(data.results)
      })
      .catch('session still active')
  }

  const getPlayer = () => {
    return <>
      {players.map(player => <p key={player}>{player}</p>)}
    </>
  }

  return (
    <>
      {sessionId && (
        <>
          Game hasn&apos;t finished <br />
          <Button variant='contained' onClick={() => { advanceToNextQuestion(quizzId); setStopIsPressed(!stopIsPressed); }}>Advance to next question </Button> <br />
          <Button variant='contained' onClick={() => { stopGame(quizzId); setStopIsPressed(!stopIsPressed); }}>Stop the game</Button> <br />
          <CopyToClipboardBtn value={`http://${window.location.host}/joingame/${sessionId}`}>Copy</CopyToClipboardBtn>
          <p>Current Players: </p>
          { getPlayer() }
        </>
      )}

      {!sessionId && (
        <>
          Result bro
          {/* table of top 5 and their score */}
          {getResult()}
          <ResultTable players={ players }></ResultTable>

          {/* bar chart */}
          {/* average response/answer time */}
        </>
      )}
    </>
  )
}

export default ResultScreen
