import React from 'react';
import './css/PlayGameScreen.css'
import { useNavigate, useParams } from 'react-router-dom';
import { MainPath } from '../utils/Path';
import fetchRequest from '../utils/fetchRequest';

const PlayGameScreen = () => {
  const { playerId } = useParams();
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchRequest({}, 'GET', `/play/${playerId}/status`)
      .then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
        navigate(`${MainPath.JOINGAME}/0`);
      });
  }, [])
  return (
    <>
      <h2>Play game screen: {playerId}</h2>
      <button onClick={() => { navigate(MainPath.PLAYERRESULT) }}>Show Result Page</button>
    </>
  );
};

export default PlayGameScreen;
