import React from 'react';
import fetchRequest from '../utils/fetchRequest';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ResultBarChart = () => {
  const { quizzId, sessionId } = useParams();
  const [quizzQuestions, setQuizzQuestions] = React.useState([]);
  const [quizCorrect, setQuizCorrect] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(async () => {
    await fetchRequest({}, 'GET', `/admin/session/${sessionId}/results`)
      .then(data => {
        const rawData = data.results.map(player => {
          return player.answers.map(answer => {
            return answer.correct ? 1 : 0
          })
        });
        const result = rawData.reduce((acc, subArray) => {
          subArray.forEach((value, index) => {
            acc[index] = (acc[index] || 0) + value;
          });
          return acc;
        }, []);
        setQuizCorrect(result);
      })
      .catch('session still active');

    await fetchRequest({}, 'GET', `/admin/quiz/${quizzId}`)
      .then(data => {
        const idArray = data.questions.map(question => { return question.id });
        setQuizzQuestions(idArray);

        const newChartData = quizzQuestions.map((qID, index) => {
          return { id: qID, percentage: Math.round((quizCorrect[index] / quizzQuestions.length) * 100) };
        })
        setChartData(newChartData);
        console.log(newChartData);
      })
  }, []);

  return <>
    <BarChart width={500} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="id" />
      <YAxis domain={[0, 100]}/>
      <Tooltip />
      <Bar dataKey="percentage" fill="#8884d8" />
    </BarChart>

    </>
}

export default ResultBarChart
