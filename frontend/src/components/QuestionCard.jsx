import React from 'react'
import { MainPath } from '../utils/Path'
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material'

const QuestionCard = (props) => {
  const { quizId, question, deleteQuestion } = props
  return (
    <>
      <Card sx={{
        minWidth: 50,
        maxWidth: 400,
        m: 2,
      }}>
        <CardContent>
          <Typography variant='h5'>
            {`Q.${question.id}: ${question.title}`}
          </Typography>
          <Typography variant='p'>
            {`Type: ${question.type}`}
          </Typography>
          <br />
          <Typography variant='p'>
            {`Time Limit: ${question.timeLimit}`}
          </Typography>
          <br />
          <Typography variant='p'>
            {`Points: ${question.points}`}
          </Typography>
          <br />
          <Typography variant='p'>
            {`Video URL: ${question.media}`}
          </Typography>
          <br />
          <Typography variant='p'>
            {`Choices: ${question.choices.join(', ')}`}
          </Typography>
          <br />
          <Typography variant='p'>
            {`Answer ID(s): ${question.answer.join(', ')}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button sx={{ marginRight: 5 }} variant="outlined" size='small' href={`${MainPath.EDITQUESTION}/${quizId}/${question.id}`}>Edit Question</Button>
          <Button variant="contained" color='error' size='small' onClick={ () => { deleteQuestion(question.id) } }>Delete Question</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default QuestionCard
