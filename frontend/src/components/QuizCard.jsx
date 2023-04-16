import React from 'react'
import fetchRequest from '../utils/fetchRequest'
import { MainPath } from '../utils/Path'
import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material'

const QuizCard = (props) => {
  const { quiz, handleOpen, setIsTryStartGame, setIsTryDeleteGame, startGame, stopGame } = props
  const [sessionIsActive, setSessionIsActive] = React.useState(false)

  const checkSessionActive = async (quiz) => {
    const quizData = await fetchRequest({}, 'GET', `/admin/quiz/${quiz}`)
    fetchRequest({}, 'GET', `/admin/session/${quizData.active}/status`)
      .then(data => { setSessionIsActive(data.results.active) });
  }

  let activeSession = quiz.active
  if (!quiz.active) {
    activeSession = 'None';
  }

  return (
    <>
      {checkSessionActive(quiz.id) &&

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
          <br />
          <Typography variant='p'>
          Active session: {activeSession}
          </Typography>
        </CardContent>
        <CardActions>
          <Button sx={{ marginRight: 1 }} variant="outlined" size='small' href={`${MainPath.EDITGAME}/${quiz.id}`}>Edit Game</Button>
          {!sessionIsActive && <Button variant="contained" size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setIsTryStartGame(true); startGame(e.target.value) }}>
            Start Game
          </Button>}
          {sessionIsActive &&
          <>
          <Button variant="contained" size='small' value={`${quiz.id}`} onClick={(e) => { stopGame(e.target.value) } }>
              Stop Game
          </Button>
          <Button variant="contained" size='small' value={`${quiz.id}`} href={`${MainPath.RESULT}/${quiz.id}`}>
            Result
          </Button>
          </>
          }
          <Button variant="contained" color='error' size='small' value={`${quiz.id}`} onClick={(e) => { handleOpen(e.target.value); setIsTryDeleteGame(true) }}>
            Delete Game
          </Button>
        </CardActions>
      </Card>}
    </>
  )
}

export default QuizCard
