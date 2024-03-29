import React from 'react';
import './css/PlayGameScreen.css'
import { useNavigate, useParams } from 'react-router-dom';
import { MainPath } from '../utils/Path';
import fetchRequest from '../utils/fetchRequest';
import { Button } from '@mui/material';
import advanceScoreCalculation from '../utils/advanceScoreCalculation';

const PlayGameScreen = () => {
  const { sessionId, playerId } = useParams();
  const navigate = useNavigate()
  const [gameStatus, setGameStatus] = React.useState(null);
  const [currentQuestion, setCurrentQuestion] = React.useState([]);
  const [correctAnswer, setCorrectAnswer] = React.useState([]);
  const [resultData, setResultData] = React.useState([]);
  const [pointTimeRecord, setPointTimeRecord] = React.useState([]);
  const [remainingTime, setRemainingTime] = React.useState(null);
  const [timeout, setTimeout] = React.useState(false);
  const [timeDiff, setTimeDiff] = React.useState([]);
  const [totalPoint, setTotalPoint] = React.useState(0);
  const [totalCorrect, setTotalCorrect] = React.useState(0);

  // Find status to correctly load screen
  React.useEffect(async () => {
    fetchRequest({}, 'GET', `/play/${playerId}/status`)
      .then((data) => {
        if (!data.started) {
          setGameStatus('waiting');
        } else {
          setGameStatus('playing');
          fetchRequest({}, 'GET', `/play/${playerId}/question`)
            .then(data => setCurrentQuestion(data.question)).catch(error => console.log(error));
        }
      }).catch(() => {
        navigate(`${MainPath.JOINGAME}/0`);
      });
  }, [])

  React.useEffect(() => {
    const checkGameStatus = (event) => {
      if (event.key === sessionId) {
        const status = localStorage.getItem(sessionId)
        if (status && Number(status) > 0) {
          setGameStatus('playing');
          fetchRequest({}, 'GET', `/play/${playerId}/question`)
            .then(data => setCurrentQuestion(data.question)).catch(error => {
              if (error === 'Session ID is not an active session') {
                localStorage.removeItem(sessionId);
                setGameStatus('finished');
                fetchRequest({}, 'GET', `/play/${playerId}/results`)
                  .then(data => {
                    setResultData(data);
                    console.log(data);
                  }).catch(error => console.log(error));
              }
            });
        }
      }
    }
    window.addEventListener('storage', checkGameStatus);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', checkGameStatus);
    }
  }, []);

  // Set real-time countdown
  React.useEffect(() => {
    if (gameStatus === 'playing' && currentQuestion.timeLimit) {
      setRemainingTime(currentQuestion.timeLimit);
      setTimeout(false);
      const timerId = setInterval(() => {
        setRemainingTime((prevRemainingTime) => {
          if (prevRemainingTime === 0) {
            clearInterval(timerId);
            setTimeout(true);
            fetchRequest({}, 'GET', `/play/${playerId}/answer`)
              .then(data => setCorrectAnswer(data.answerIds)).catch(error => console.log(error));
            return 0;
          }
          return prevRemainingTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [gameStatus, currentQuestion]);

  // detect changes in choice selection
  React.useEffect(async () => {
    const inputs = document.querySelectorAll('[name="q-choices"]');
    if (inputs && inputs.length > 0) {
      if (inputs[0].type === 'radio') {
        inputs.forEach(input => {
          input.addEventListener('change', singleQuestionChange);
        });

        return () => {
          inputs.forEach(input => {
            input.removeEventListener('change', singleQuestionChange);
          });
        }
      } else if (inputs[0].type === 'checkbox') {
        inputs.forEach(input => {
          input.addEventListener('change', multipleQuestionChange);
        });

        return () => {
          inputs.forEach(input => {
            input.removeEventListener('change', multipleQuestionChange);
          });
        }
      }
    }
  }, [currentQuestion, timeout]);

  // Record the points for each question
  React.useEffect(async () => {
    if (gameStatus === 'playing' && currentQuestion.points && currentQuestion.timeLimit) {
      const updatedPointTimeRecord = [...pointTimeRecord];
      updatedPointTimeRecord.push({
        point: Number(currentQuestion.points),
        time: Number(currentQuestion.timeLimit),
      });
      setPointTimeRecord(updatedPointTimeRecord);
    }
  }, [currentQuestion]);

  const singleQuestionChange = (event) => {
    if (event.target.checked) {
      const payload = {
        answerIds: [
          Number(event.target.value)
        ]
      }
      fetchRequest(payload, 'PUT', `/play/${playerId}/answer`);
    }
  }
  const multipleQuestionChange = async () => {
    const newAnswerList = [];
    const inputs = document.querySelectorAll('[name="q-choices"]');
    inputs.forEach(input => {
      if (input.checked) {
        newAnswerList.push(Number(input.value))
      }
    })
    if (!newAnswerList) {
      newAnswerList.push(Number(0))
    }
    const payload = {
      answerIds: newAnswerList
    }
    fetchRequest(payload, 'PUT', `/play/${playerId}/answer`).catch(error => console.log(error));
  }

  // Set up data for result page
  React.useEffect(async () => {
    const timeDiffArray = [];
    let correctlyAnswered = 0;
    let points = 0.0;
    resultData.forEach((question, index) => {
      const startTime = new Date(question.questionStartedAt).getTime();
      const answerTime = new Date(question.answeredAt).getTime();
      const elapsedTime = Math.ceil((answerTime - startTime) / 1000);
      timeDiffArray.push(elapsedTime);
      if (question.correct) {
        correctlyAnswered += 1;
        points += advanceScoreCalculation(pointTimeRecord[index].time, pointTimeRecord[index].point, startTime, answerTime);
      }
    })
    setTotalCorrect(correctlyAnswered);
    setTotalPoint(points.toFixed(2));
    setTimeDiff(timeDiffArray);
  }, [resultData]);

  return (
    <>
      <div className='play-game-background'>
        <div className='play-game-page'>
          {gameStatus === 'waiting' &&
          <div className='lobby'>
            <h4>Waiting for the game to start...</h4>
          </div>
          }
          {gameStatus === 'playing' &&
            <>
              <h2>Question {currentQuestion.id}: {currentQuestion.title}  - {currentQuestion.points} Points</h2>
                {currentQuestion.media && currentQuestion.media.startsWith('https://www.youtube.com/embed/') &&
                  <div className='video-container'>
                    <iframe
                      src={currentQuestion.media}
                      title={`YouTube video for Q${currentQuestion.id}`}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      allowfullscreen>
                    </iframe>
                  </div>
                }
                <p>Remaining time: {remainingTime}</p>
                <br />
                <form>
                  {!timeout && currentQuestion.type === 'single' && currentQuestion.choices.map((choice, index) => {
                    return (
                      <div key={index} style={{ display: 'flex', textAlign: 'left', marginLeft: 30 }}>
                        <input type='radio' id={`q-choices-${index + 1}`} className='q-choices' name='q-choices' value={index + 1} />
                        <label>{choice.trim()}</label>
                        <br />
                      </div>
                    )
                  })}
                </form>
                {!timeout && currentQuestion.type === 'multiple' && currentQuestion.choices.map((choice, index) => {
                  return (
                    <div key={index} style={{ display: 'flex', textAlign: 'left', marginLeft: 30 }}>
                      <input type='checkbox' id={`q-choices-${index + 1}`} className='q-choices' name='q-choices' value={index + 1} />
                      <label>{choice.trim()}</label>
                      <br />
                    </div>
                  )
                })}
                {timeout &&
                  <>
                    <h5> Corrrect answer(s): </h5>
                    {correctAnswer.map((answerID, index) => {
                      return (
                        <div key={index}>{answerID}</div>
                      )
                    })}
                  </>
                }
            </>
          }
          {gameStatus === 'finished' &&
            <>
              <h2>Game Result</h2>
              <p> Point for each question will be calculated as (1 + (remaining time in percentage * scaling rate))points</p>
              <br />
              <p> Note: scaling is a number between 0 to 1 </p>
              <h3> Question correctly answered {totalCorrect}/{resultData.length} | Total Points: {totalPoint} </h3>

              {resultData.map((question, index) => {
                return (
                  <div key={index} style={{ display: 'flex', textAlign: 'left', marginLeft: 30 }}>
                    <p>
                      Question {index + 1}: {question.correct ? 'Correct, ' : 'Incorrect, '}
                      {question.answeredAt ? `answered in ${timeDiff[index]} seconds` : 'did not answer'}
                    </p>
                    <p>Your answer: {question.answerIds.join(', ')}</p>
                  </div>
                )
              })}
            </>
          }
          <br />
          <Button variant="outlined" size='small' style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: '10px',
            padding: '10px',
          }} onClick={() => navigate(`${MainPath.JOINGAME}/0`)}> Back </Button>
        </div>
      </div>
    </>
  );
};

export default PlayGameScreen;
