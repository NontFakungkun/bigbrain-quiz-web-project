import React from 'react';
import { useParams } from 'react-router-dom';

const ResultScreen = (props) => {
  const { authed } = useParams();
  console.log(authed.value);
  return (
    <>
      {authed.value}
    </>
  )
}

export default ResultScreen
