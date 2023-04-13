import React from 'react';
import Card from '@mui/material/Card';
import LogoutButton from '../components/LogoutButton';
import { CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { MainPath } from '../utils/Path';
import ModalStartGameBox from '../components/ModalStartGameBox';
import CopyToClipboardBtn from '../components/CopyToClipboardBtn';
import fetchRequest from '../utils/fetchRequest';

const DashboardScreen = () => {
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

  React.useEffect(() => {
    fetchQuizzes();
  }, [])

  const fetchQuizzes = async () => {
    await fetchRequest({}, 'GET', '/admin/quiz')
      .then(async (data) => {
        console.log(data)
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
          };
          updatedQuizzes.push(updatedQuiz);
        }
        // data.quizzes.forEach((quiz) => {
        //   fetchRequest({}, 'GET', `/admin/quiz/${quiz.id}`)
        //     .then((data) => {
        //       console.log(data)
        //       const newQuizzesList = [...data];
        //       const quizIndex = newQuizzesList.findIndex((q) => q.id === quiz.id);
        //       newQuizzesList[quizIndex].qnum = data.questions.length;
        //       const totalTime = data.questions.reduce((total, quiz) => total + Number(quiz.timeLimit), 0);
        //       // Convert sec into min:sec
        //       const mins = Math.floor(totalTime / 60);
        //       const secs = totalTime % 60;
        //       newQuizzesList[quizIndex].totalTime = `${mins}:${secs}`;
        //       setQuizzesList(newQuizzesList);
        //     });
        // });
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
    return isTryStartGame ? `Session ID: ${currentQuizzId}` : 'Would you like to view the results?';
  }

  const deleteQuizz = async () => {
    fetchRequest({}, 'DELETE', `/admin/quiz/${currentQuizzId}`)
      .then(() => {
        fetchQuizzes();
        handleClose();
      })
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
            <Typography variant='p'>
              {quiz.qnum} Questions - {quiz.totalTime} Minutes
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ marginRight: 1 }} variant="outlined" size='small' href={`${MainPath.EDITGAME}/${quiz.id}`}>Edit Game</Button>
            <Button variant="contained" size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setIsTryStartGame(true); }}>
              Start Game
            </Button>
            <Button variant="contained" size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setIsTryStartGame(false); }}>
              Stop Game
            </Button>
            <Button variant="contained" color='error' size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setIsTryDeleteGame(true) }}>
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
      <LogoutButton />
    </>
  );
};

export default DashboardScreen;
