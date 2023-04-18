import React from 'react';
import { MainPath } from '../utils/Path';
import LogoutButton from '../components/LogoutButton';
import { Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import fetchRequest from '../utils/fetchRequest';

const EditQuestionScreen = () => {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const [questionList, setQuestionList] = React.useState([]);
  const [questionData, setQuestionData] = React.useState({
    choices: [],
    answer: [],
  });
  const [newTitle, setNewTitle] = React.useState('');
  const [newType, setNewType] = React.useState('');
  const [newTimeLimit, setNewTimeLimit] = React.useState('');
  const [newPoints, setNewPoints] = React.useState('');
  const [newMedia, setNewMedia] = React.useState('');
  const [newChoices, setNewChoices] = React.useState('');
  const [newAnswer, setNewAnswer] = React.useState('');

  const fetchQuestionData = async () => {
    await fetchRequest({}, 'GET', `/admin/quiz/${quizId}`)
      .then((data) => {
        console.log(data.questions)
        console.log(data.questions.filter((question) => question.id === Number(questionId))[0])
        setQuestionList(data.questions);
        setQuestionData(data.questions.filter((question) => question.id === Number(questionId))[0]);
      })
  }

  const updateQuestion = async () => {
    const updateQuestions = questionList.map((question) => {
      console.log(question.id)
      if (question.id === Number(questionId)) {
        let choicesList = question.choices;
        if (newChoices !== '') {
          choicesList = newChoices.split(';').map((item) => item.trim());
        }
        let answerList = question.answer;
        if (newAnswer !== '') {
          answerList = newAnswer.split(';').map((num) => Number(num.trim()));
        }
        return {
          id: Number(questionId),
          title: newTitle === '' ? question.title : newTitle,
          type: newType === '' ? question.type : newType,
          timeLimit: newTimeLimit === '' ? question.timeLimit : newTimeLimit,
          points: newPoints === '' ? question.points : newPoints,
          media: newMedia === '' ? question.media : newMedia,
          choices: choicesList === '' ? question.choices : choicesList,
          answer: answerList === '' ? question.answer : answerList,
        };
      }
      return question;
    });
    const payload = {
      questions: updateQuestions,
      name: '',
      thumbnail: '',
    }
    fetchRequest(payload, 'PUT', `/admin/quiz/${quizId}`)
      .then(() => {
        fetchQuestionData();
      })
  }

  const clearInput = () => {
    setNewTitle('');
    setNewType('');
    setNewTimeLimit('');
    setNewPoints('');
    setNewMedia('');
    setNewChoices('');
    setNewAnswer('');
  }

  React.useEffect(async () => {
    await fetchQuestionData();
  }, [])

  return (
    <>
      <h2> Edit Question {questionId} in Game {quizId} </h2>
      <Button variant="outlined" size='small' style={{ float: 'right' }} onClick={() => navigate(`${MainPath.EDITGAME}/${quizId}`)}> Back </Button><br />
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Edit Question
      </Typography>
      <table>
        <thead>
          <tr>
            <th>Current Data</th>
            <th>Input</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Title: {questionData.title}</td>
            <td><input name="edit-title" value={newTitle} onChange={(e) => { setNewTitle(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>Type (single/multiple): {questionData.type}</td>
            <td><input name="edit-type" value={newType} onChange={(e) => { setNewType(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>Time Limit: {questionData.timeLimit}</td>
            <td><input name="edit-time-limit" value={newTimeLimit} onChange={(e) => { setNewTimeLimit(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>Points: {questionData.points}</td>
            <td><input name="edit-points" value={newPoints} onChange={(e) => { setNewPoints(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>
              Video URL: {questionData.media}
              <br />
              put embed youtube link in a form of https://www.youtube.com/embed/xxxxxxx
            </td>
            <td><input name="edit-media" value={newMedia} onChange={(e) => { setNewMedia(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>
              Choices:
              <ul>
                {questionData.choices.map((choice, index) => (
                  <li key={index}>{choice}</li>
                ))}
              </ul>
              <br />
              In input text, write new choices separate all choices by ;
            </td>
            <td><textarea name="edit-choices" rows={3} value={newChoices} onChange={(e) => { setNewChoices(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>
              Answer ID(s):
              <ul>
                {questionData.answer.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
              <br />
              Put number i.e. 1 for first choice, write new answer ID(s) separate all choices by ;
            </td>
            <td><textarea name="edit-answers" rows={3} value={newAnswer} onChange={(e) => { setNewAnswer(e.target.value) }} /></td>
          </tr>
        </tbody>
      </table>
      <br />
      <Button name='edit-question' sx={{ marginRight: 1 }} variant="contained" size='small' onClick={ updateQuestion }>
        Edit Question
      </Button>
      <Button variant="outlined" size='small' onClick={ clearInput }>
        Clear
      </Button>
      <hr />
      <LogoutButton />
    </>
  );
};

export default EditQuestionScreen;
