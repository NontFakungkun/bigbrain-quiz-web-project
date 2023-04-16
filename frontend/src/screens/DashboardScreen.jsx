import React from 'react';
import LogoutButton from '../components/LogoutButton';
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { MainPath } from '../utils/Path';
import ModalStartGameBox from '../components/ModalStartGameBox';
import CopyToClipboardBtn from '../components/CopyToClipboardBtn';
import QuizCard from '../components/QuizCard';
import fetchRequest from '../utils/fetchRequest';
import TextField from '@mui/material/TextField';

const DashboardScreen = () => {
  const [newGameDisplay, setNewGameDisplay] = React.useState(false);
  const [quizzesList, setQuizzesList] = React.useState([]);
  const [newQuizName, setNewQuizName] = React.useState('');
  const [currentQuizzId, setCurrentQuizzId] = React.useState('');
  const [currentActiveSessId, setCurrentActiveSessId] = React.useState('');

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

  React.useEffect(() => {
    fetchQuizzes();
  }, [])

  const fetchQuizzes = async () => {
    await fetchRequest({}, 'GET', '/admin/quiz')
      .then(async (data) => {
        const quizzes = data.quizzes;
        const updatedQuizzes = [];
        for (let i = 0; i < quizzes.length; i++) {
          const quiz = quizzes[i];
          const quizData = await fetchRequest({}, 'GET', `/admin/quiz/${quiz.id}`);
          // Convert sec into min:sec
          const totalTime = quizData.questions.reduce((total, q) => total + Number(q.timeLimit), 0)
          const mins = Math.floor(totalTime / 60);
          const secs = totalTime % 60;
          const updatedQuiz = {
            ...quiz,
            qnum: quizData.questions.length,
            totalTime: `${mins}:${secs}`,
            active: quizData.active,
          };
          updatedQuizzes.push(updatedQuiz);
        }
        setQuizzesList(updatedQuizzes);
      })
  }

  const createNewGame = async () => {
    const payload = {
      name: newQuizName
    }
    fetchRequest(payload, 'POST', '/admin/quiz/new')
      .then(() => {
        setNewQuizName('');
        setNewGameDisplay(false);
        fetchQuizzes();
      })
  }

  const modalStartStopGame = () => {
    return isTryStartGame ? `Session ID: ${currentQuizzId}` : 'Would you like to stop the game?';
  }

  const deleteQuizz = async () => {
    fetchRequest({}, 'DELETE', `/admin/quiz/${currentQuizzId}`)
      .then(() => {
        fetchQuizzes();
        handleClose();
      })
  }

  const startGame = async (quizId) => {
    fetchRequest({}, 'POST', `/admin/quiz/${quizId}/start`).then(
      () => {
        fetchRequest({}, 'GET', `/admin/quiz/${quizId}`).then(
          data => {
            setCurrentActiveSessId(data.active);
            localStorage.setItem('myapp_test', 0);
          }
        );
      }
    ).catch(
      (error) => {
        if (error === 'Quiz already has active session') {
          fetchRequest({}, 'GET', `/admin/quiz/${quizId}`).then(
            data => setCurrentActiveSessId(data.active)
          );
        }
      }
    );
  }

  const stopGame = async (quizId) => {
    fetchRequest({}, 'POST', `/admin/quiz/${quizId}/end`).then(
      () => {
        setCurrentActiveSessId('');
        localStorage.removeItem('myapp_test');
      }
    )
      .then(() => window.location.reload(false));
  }

  return (
    <>
      <h2> Dashboard </h2>
      <Button onClick={() => setNewGameDisplay(!newGameDisplay)}>
        Create New Game
      </Button>
      <br />
      { newGameDisplay && (
        <>
          <br />
          <p>Name: </p>
          <TextField margin="normal" id="outlined-basic" label="Outlined" variant="outlined" value={newQuizName} onChange={(e) => setNewQuizName(e.target.value)}/> <br />
          <button onClick={createNewGame}>Create New Game</button>
          <hr />
        </>
      )}
      <Grid container spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        {console.log(quizzesList)}
        {quizzesList.map((quiz, index) => (
          <QuizCard key={index} quiz={quiz} handleOpen={handleOpen} setIsTryStartGame={setIsTryStartGame} setIsTryDeleteGame={setIsTryDeleteGame} startGame={startGame} fetchQuizzes={fetchQuizzes} />
        ))}
      </Grid>

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
            {!isTryDeleteGame && isTryStartGame && <CopyToClipboardBtn value={`http://${window.location.host}/joingame/${currentActiveSessId}`}>Copy</CopyToClipboardBtn>}
            {!isTryDeleteGame && !isTryStartGame &&
              <><br />
                <Button variant="contained" size='small' href={`${MainPath.RESULT}/${currentQuizzId}`}>yes</Button>
                <Button variant="outlined" size='small' value={currentQuizzId} onClick={(e) => {
                  stopGame(e.target.value);
                  handleClose();
                  fetchQuizzes();
                }}>no</Button>
              </>
            }
          </Typography>
        </ModalStartGameBox>
      </Modal>
      <hr />
      <LogoutButton />
    </>
  );
};

export default DashboardScreen;
