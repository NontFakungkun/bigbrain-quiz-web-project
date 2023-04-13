import React from 'react';
import { MainPath } from '../utils/Path';
import Card from '@mui/material/Card';
import LogoutButton from '../components/LogoutButton';
import { CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';

const DashboardScreen = () => {
  const token = localStorage.getItem('token');
  const [newGameDisplay, setNewGameDisplay] = React.useState(false);
  const [quizzesList, setQuizzesList] = React.useState([]);

  const [newQuizName, setNewQuizName] = React.useState('');

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
    await fetchQuizzes();
    await setNewGameDisplay(false);
  }

  return (
    <>
      This is Dashboard screen! <br />
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
            <Button size='small' href={MainPath.EDITGAME}>Edit Game</Button>
          </CardActions>
        </Card>
        </>
      ))}

      <hr />
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

      <LogoutButton />
    </>
  );
};

export default DashboardScreen;
