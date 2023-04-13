import React from 'react';
import { MainPath } from '../utils/Path';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import LogoutButton from '../components/LogoutButton';
import { Typography, Button, Modal, Box, CardContent, CardActions } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import fetchRequest from '../utils/fetchRequest';
const EditGameScreen = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questionList, setQuestionList] = React.useState([]);
  const [gameName, setGameName] = React.useState('');
  const [thumbnailURL, setThumbnailURL] = React.useState('');
  const [newGameName, setNewGameName] = React.useState('');
  const [newThumbnailURL, setNewThumbnailURL] = React.useState('');
  const [newQTitle, setNewQTitle] = React.useState('');
  const [newQType, setNewQType] = React.useState('');
  const [newQTimeLimit, setNewQTimeLimit] = React.useState(0);
  const [newQPoints, setNewQPoints] = React.useState(0);
  const [newQMedia, setNewQMedia] = React.useState('');
  const [newQChoices, setNewQChoices] = React.useState('');
  const [newQAnswer, setNewQAnswer] = React.useState('');
  const [gameDetailModal, setGameDetailModal] = React.useState(false);
  const [newGameModal, setNewGameModal] = React.useState(false);

  const fetchQuizData = async () => {
    fetchRequest({}, 'GET', `/admin/quiz/${quizId}`)
      .then((data) => {
        setGameName(data.name);
        setThumbnailURL(data.thumbnail);
        setQuestionList(data.questions);
        console.log(data);
        console.log(data.questions);
        console.log(questionList);
      })
  }

  const updateQuiz = async (questions, name, thumbnail) => {
    const payload = {
      questions,
      name,
      thumbnail,
    }
    fetchRequest(payload, 'PUT', `/admin/quiz/${quizId}`)
      .then(() => {
        fetchQuizData();
      })
  }

  const addNewQuestion = async () => {
    const choicesList = newQChoices.trim().split(';');
    const answerNumList = newQAnswer.split(';').map((num) => Number(num.trim()));
    const answerList = choicesList.filter((question, index) => answerNumList.includes(index + 1));
    const questions = questionList;
    questions.push({
      id: questions.length + 1,
      title: newQTitle,
      type: newQType,
      timeLimit: newQTimeLimit,
      points: newQPoints,
      media: newQMedia,
      choices: choicesList,
      answer: answerList,
    })
    updateQuiz(questions, '', '');
    setNewGameModal(false);
    setNewQTitle('');
    setNewQType('');
    setNewQTimeLimit(0);
    setNewQPoints(0);
    setNewQMedia('');
    setNewQChoices('');
    setNewQAnswer('');
  }

  const EditGameData = () => {
    updateQuiz(questionList, newGameName, newThumbnailURL);
    setGameDetailModal(false);
    setNewGameName('');
    setNewThumbnailURL('');
  }

  const deleteQuestion = (deleteId) => {
    const newQuestionList = questionList.filter(obj => obj.id !== deleteId).map((obj) => {
      if (obj.id > deleteId) {
        obj.id -= 1;
      }
      return obj;
    });
    updateQuiz(newQuestionList, '', '');
  }

  React.useEffect(async () => {
    await fetchQuizData();
  }, [])

  return (
    <>
      <h2> Edit Game: {quizId} </h2>
      <Button variant="outlined" size='small' style={{ float: 'right' }} onClick={() => navigate(MainPath.DASHBOARD)}> Back </Button><br />
      <img src={thumbnailURL} alt="Game Thumbnail" />
      <p>Name: {gameName}</p>
      <br />
      <div className='top-btns'>
        <Button variant="contained" size='small' onClick={() => { setGameDetailModal(true) }}>
          Edit Game Details
        </Button>
        <Button variant="contained" size='small' style={{ float: 'right' }} onClick={() => { setNewGameModal(true) }}>
          Create New Question
        </Button>
      </div>
      <br />
      <Grid sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        {questionList.map(quiz => (
          <>
            <Card sx={{
              minWidth: 50,
              maxWidth: 400,
              m: 2,
            }}>
              <CardContent>
                <Typography variant='h5'>
                  {`Q.${quiz.id}: ${quiz.title}`}
                </Typography>
                <Typography variant='p'>
                  {`Type: ${quiz.type}`}
                </Typography>
                <br />
                <Typography variant='p'>
                  {`Time Limit: ${quiz.timeLimit}`}
                </Typography>
                <br />
                <Typography variant='p'>
                  {`Points: ${quiz.points}`}
                </Typography>
                <br />
                <Typography variant='p'>
                  {`Media URL: ${quiz.media}`}
                </Typography>
                <br />
                <Typography variant='p'>
                  {`Choices: ${quiz.choices.join(', ')}`}
                </Typography>
                <br />
                <Typography variant='p'>
                  {`Answer(s): ${quiz.answer.join(', ')}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button sx={{ marginRight: 5 }} variant="outlined" size='small' href={MainPath.EDITGAME}>Edit Question</Button>
                <Button variant="contained" color='error' size='small' onClick={ () => { deleteQuestion(quiz.id) } }>Delete Question</Button>
              </CardActions>
            </Card>
          </>
        ))}
      </Grid>
      <hr />
      <LogoutButton />
      <Modal
        sx={{
          width: 300,
          height: 300,
          top: '30%',
          left: '40%',
        }}
        open={gameDetailModal}
        onClose={() => { setGameDetailModal(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={{
            backgroundColor: '#909090',
            border: '1px solid black',
            color: 'white'
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit game details
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p> Name:</p>
              <input value={newGameName} onChange={(e) => { setNewGameName(e.target.value) }}></input>
              <p> Thumbnail URL: </p>
              <input value={newThumbnailURL} onChange={(e) => { setNewThumbnailURL(e.target.value) }}></input>
            </Typography>
            <br />
            <Button variant='contained' size='small' onClick={ EditGameData }> Update </Button>
          </Box>
      </Modal>

      <Modal
        sx={{
          width: 300,
          height: 300,
          top: '30%',
          left: '40%',
        }}
        open={newGameModal}
        onClose={() => { setNewGameModal(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={{
            backgroundColor: '#909090',
            border: '1px solid black',
            color: 'white'
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create new question
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Title
              <input value={newQTitle} onChange={(e) => { setNewQTitle(e.target.value) }}></input> <br />
              Type
              <input value={newQType} onChange={(e) => { setNewQType(e.target.value) }}></input> <br />
              Time Limit
              <input value={newQTimeLimit} onChange={(e) => { setNewQTimeLimit(e.target.value) }}></input> <br />
              Points
              <input value={newQPoints} onChange={(e) => { setNewQPoints(e.target.value) }}></input> <br />
              Media URL
              <input value={newQMedia} onChange={(e) => { setNewQMedia(e.target.value) }}></input> <br />
              Choices (separate all choices by ;)
              <input value={newQChoices} onChange={(e) => { setNewQChoices(e.target.value) }}></input> <br />
              Answers (put number i.e. 1 for first choice, separate all answers by ;)
              <input value={newQAnswer} onChange={(e) => { setNewQAnswer(e.target.value) }}></input> <br />
            </Typography>
            <br />
            <Button variant='contained' size='small' onClick={ addNewQuestion }> Add Question </Button>
          </Box>
      </Modal>
    </>
  );
};

export default EditGameScreen;
