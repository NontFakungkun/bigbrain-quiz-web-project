import React from 'react'
import { MainPath } from '../utils/Path'
import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material'

const QuizCard = (props) => {
  const { quiz, handleOpen, setIsTryStartGame, setIsTryDeleteGame } = props
  return (
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
  )
}

export default QuizCard
