import React from 'react';
import Card from '@mui/material/Card';
import LogoutButton from '../components/LogoutButton';
import { CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { MainPath } from '../utils/Path';
import ModalStartGameBox from '../components/ModalStartGameBox';
import CopyToClipboardBtn from '../components/CopyToClipboardBtn';

const DashboardScreen = () => {
  const token = localStorage.getItem('token');
  const [newGameDisplay, setNewGameDisplay] = React.useState(false);
  const [quizzesList, setQuizzesList] = React.useState([]);
  const [newQuizName, setNewQuizName] = React.useState('');
  const [currentQuizzId, setCurrentQuizzId] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = (value) => {
    setOpen(true);
    setCurrentQuizzId(value);
  };
  const handleClose = () => {
    setOpen(false);
    setIsTryDeleteGame(false)
  };
  const [isTryStartGame, setIsTryStartGame] = React.useState(false);
  const [isTryDeleteGame, setIsTryDeleteGame] = React.useState(false);

  const fetchQuizzes = async () => {
    const response = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json();
    setQuizzesList(data.quizzes);
  }

  React.useEffect(async () => {
    await fetchQuizzes();
  }, [newGameDisplay])

  const createNewGame = async () => {
    await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: newQuizName
      })
    })
    fetchQuizzes();
    setNewQuizName('');
    setNewGameDisplay(false);
  }

  const modalStartStopGame = () => {
    return isTryStartGame ? `Session ID: ${currentQuizzId}` : 'Would you like to view the results?';
  }

  const deleteQuizz = async () => {
    await fetch(`http://localhost:5005/admin/quiz/${currentQuizzId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    await fetchQuizzes();
    handleClose();
  }

  return (
    <>
      <h2> Dashboard </h2> <br />
      <button onClick={() => setNewGameDisplay(!newGameDisplay)}>
        Create New Game
      </button>
      <br />
      { newGameDisplay && (
        <>
          New game setting:
          <br />
          Name: <input value={newQuizName} onChange={(e) => setNewQuizName(e.target.value)}/>
          <button onClick={createNewGame}>Create New Game</button>
        </>
      )}
      {quizzesList.map(quiz => (
        <>
        <Card sx={{ minWidth: 500, maxWidth: 50, m: 2 }}>
          <CardMedia
            component="img"
            height="100"
            image= {quiz.thumbnail}
            alt={`${quiz.name} ${quiz.owner} ${quiz.createdAt}`}
          />
          <CardContent>
            <Typography variant='h6'>
              {quiz.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size='small' href={MainPath.EDITGAME}>Edit Game</Button>
            <Button variant="contained" size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setIsTryStartGame(true); }}>
              Start Game
            </Button>
            <Button variant="contained" size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setIsTryStartGame(false); }}>
              Stop Game
            </Button>
            <Button variant="contained" size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setIsTryDeleteGame(true) }}>
              Delete Game
            </Button>
          </CardActions>
        </Card>
        </>
      ))}

      <Modal open={open} onClose={handleClose}>
        <ModalStartGameBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {!isTryDeleteGame && modalStartStopGame()}
            {isTryDeleteGame &&
              <>
                Are you sure? <br />
                <Button variant="contained" size='small' onClick={deleteQuizz}>DELETE</Button>
                <Button variant="outlined" size='small' onClick={handleClose}>cancel</Button>
              </>
            }
            {!isTryDeleteGame && isTryStartGame && <CopyToClipboardBtn value={currentQuizzId}>Copy</CopyToClipboardBtn>}
            {!isTryDeleteGame && !isTryStartGame &&
              <><br />
                <Button variant="contained" size='small' href={MainPath.RESULT}>yes</Button>
                <Button variant="outlined" size='small' value={'1'} onClick={handleClose}>no</Button>
              </>
            }
          </Typography>
        </ModalStartGameBox>
      </Modal>

      <hr />
      <Button onClick={() => setNewGameDisplay(!newGameDisplay)}>
        Create New Game
      </Button>
      <br />
      { newGameDisplay && (
        <>
          New game setting:
          <br />
          Name: <input value={newQuizName} onChange={(e) => setNewQuizName(e.target.value)}/>
          <button onClick={createNewGame}>Create New Game</button>
        </>
      )}

      <LogoutButton />
    </>
  );
};

export default DashboardScreen;
