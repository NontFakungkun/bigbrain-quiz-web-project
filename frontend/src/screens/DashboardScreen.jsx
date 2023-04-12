import React from 'react';
import LogoutButton from '../components/LogoutButton';

const DashboardScreen = () => {
  const token = localStorage.getItem('token');
  const [newGameDisplay, setNewGameDisplay] = React.useState(false);
  const [quizzesList, setQuizzesList] = React.useState([]);

  const [newQuizName, setNewQuizName] = React.useState('');

  React.useEffect(async () => {
    const response = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json();
    setQuizzesList(data.quizzes);
  }, [])

  const createNewGame = async () => {
    await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: newQuizName,
      })
    })
  }

  console.log(quizzesList);
  return (
    <>
      This is Dashboard screen! <br />
      {quizzesList.map(quiz => (
        <>
        {quiz.name}<br />
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
