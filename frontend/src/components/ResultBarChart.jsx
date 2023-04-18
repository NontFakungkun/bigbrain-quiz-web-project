import React from 'react';
import fetchRequest from '../utils/fetchRequest';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ResultBarChart = () => {
  const { quizzId, sessionId } = useParams();
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(async () => {
    const [quizResult, quizData] = await Promise.all([
      fetchRequest({}, 'GET', `/admin/session/${sessionId}/results`),
      fetchRequest({}, 'GET', `/admin/quiz/${quizzId}`)
    ]);

    const idArray = quizData.questions.map(question => { return question.id });
    const rawData = quizResult.results.map(player => {
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
    const totalPlayer = rawData.length;

    const newChartData = idArray.map((qID, index) => {
      return { id: qID, percentage: Math.round((result[index] / totalPlayer) * 100) };
    });
    setChartData(newChartData);
  }, [quizzId, sessionId]);

  return <>
      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Bar dataKey="percentage" fill="#8884d8" />
      </BarChart>
    </>
};

export default ResultBarChart;
