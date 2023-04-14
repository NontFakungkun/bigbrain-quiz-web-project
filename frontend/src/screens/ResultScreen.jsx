import React from 'react';
import { useParams } from 'react-router-dom';

const ResultScreen = () => {
  const { sessionId } = useParams();
  console.log(sessionId);
  return (
    <>
      { sessionId }
    </>
  )
}

export default ResultScreen
