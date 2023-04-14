import React from 'react';
import './css/JoinGameScreen.css'
import { useNavigate, useParams } from 'react-router-dom';
import { MainPath } from '../utils/Path';
import fetchRequest from '../utils/fetchRequest';
import { Button } from '@mui/material';

const JoinGameScreen = () => {
  const { sessionId } = useParams();
  const [gameSession, setGameSession] = React.useState(sessionId);
  const [playerName, setPlayerName] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!gameSession) {
      setErrorMessage('Enter game session');
    } else if (!playerName) {
      setErrorMessage('Enter your name');
    } else {
      const payload = {
        name: playerName,
      }
      fetchRequest(payload, 'POST', `/play/join/${gameSession}`)
        .then((data) => {
          navigate(`${MainPath.PLAYGAME}/${data.playerId}`);
        }).catch((error) => {
          setErrorMessage(error);
        });
    }
  }

  return (
    <div className='join-game-background'>
      <div className='join-game-page'>
        <h1>Join a Game</h1>
        <form>
          <p>Game Session ID</p>
          <input type="text" className='input-box' placeholder='Enter game session' value={gameSession} onChange={(event) => { setGameSession(event.target.value) }}/>
          <p>Name</p>
          <input type="text" className='input-box' placeholder='Enter your name' value={playerName} onChange={(event) => { setPlayerName(event.target.value) }}/>
          <p className='error-message'>{errorMessage}</p>
          <br />
          <Button variant="contained" size='small' className='btn-primary' onClick={ handleSubmit }> Join Game </Button>
        </form>
      </div>
    </div>
  );
};

export default JoinGameScreen;
