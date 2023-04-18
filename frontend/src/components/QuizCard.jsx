import React from 'react'
import fetchRequest from '../utils/fetchRequest'
import { MainPath } from '../utils/Path'
import { Card, CardMedia, CardActions, CardContent, Typography, Button, Box, Modal } from '@mui/material'

const QuizCard = (props) => {
  const { quiz, handleOpen, fetchQuizzes, setQuizzIdSessionId, setModalState } = props
  const [sessionIsActive, setSessionIsActive] = React.useState('')

  const checkSessionActive = async (quiz) => {
    const quizData = await fetchRequest({}, 'GET', `/admin/quiz/${quiz.id}`)
    await fetchRequest({}, 'GET', `/admin/session/${quizData.active}/status`)
      .then(data => {
        if (data.results.active !== null) { setSessionIsActive(data.results.active) } else { setSessionIsActive(false) }
      })
      .catch(error => {
        console.log('session not active: ' + error);
      })
  }

  let activeSession = quiz.active
  if (!quiz.active) {
    activeSession = 'None';
  }
  const [uploadModal, setUploadModal] = React.useState(false);
  const [dataFile, setDataFile] = React.useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const fileContent = JSON.parse(event.target.result);
        console.log(fileContent);
        setDataFile(fileContent);
      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsText(uploadedFile);
  };

  const uploadGameData = () => {
    if (dataFile) {
      fetchRequest(dataFile, 'PUT', `/admin/quiz/${quiz.id}`).then(() => fetchQuizzes());
    }
  }

  return (
    <>
      {checkSessionActive(quiz) &&

      <Card sx={{ minWidth: 600, maxWidth: 60, m: 2 }}>
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
          <br />
          <Typography variant='p'>
          Active session: {activeSession}
          </Typography>
        </CardContent>
        <CardActions>
          <Button sx={{ marginRight: 1 }} variant="outlined" size='small' href={`${MainPath.EDITGAME}/${quiz.id}`}>Edit Game</Button>
          <Button variant="outlined" size='small' onClick={() => { setUploadModal(true); }}>
            Upload Data
          </Button>
          {!sessionIsActive && <Button variant="contained" size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setModalState('start'); }}>
            Start Game
          </Button>}
          {sessionIsActive &&
          <>
          <Button variant="contained" size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setModalState('stop') }} >
            Stop Game
          </Button>
          <Button variant="contained" size='small' value={`${quiz.id}`} onClick={(e) => { setQuizzIdSessionId(e.target.value) }} href={`${MainPath.RESULT}/${quiz.id}/${quiz.active}`}>
            Result
          </Button>
          </>
          }
          <Button variant="contained" color='error' size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setModalState('delete'); }}>
            Delete Game
          </Button>
        </CardActions>
      </Card>}
      <Modal
        sx={{
          width: 300,
          height: 300,
          top: '30%',
          left: '40%',
        }}
        open={uploadModal}
        onClose={() => { setUploadModal(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={{
            backgroundColor: '#909090',
            border: '1px solid black',
            color: 'white'
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload game data
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Note: JSON file only
              <input
                type="file"
                id="json-file-upload"
                accept=".json"
                onChange={ handleFileUpload }>
              </input>
            </Typography>
            <br />
            <Button variant='contained' size='small' onClick={ () => { uploadGameData(); setUploadModal(false); } }> Upload </Button>
          </Box>
      </Modal>
    </>
  )
}

export default QuizCard
