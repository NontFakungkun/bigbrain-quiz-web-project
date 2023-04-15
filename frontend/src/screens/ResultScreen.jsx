import React from 'react';
import { useParams } from 'react-router-dom';
import fetchRequest from '../utils/fetchRequest';

const ResultScreen = () => {
  const { currentQuizzId } = useParams();
  // console.log(currentQuizzId);
  const [sessionId, setSessionId] = React.useState('');

  const getQuizzData = (quizzId) => {
    fetchRequest({}, 'GET', `/admin/quiz/${quizzId}`)
      .then(data => setSessionId(data.active))
  }

  return (
    <>
      {getQuizzData(currentQuizzId)}
      {console.log(sessionId)}
      {/* if game finished */}

      {/* if game not finished */}
    </>
  )
}

export default ResultScreen
