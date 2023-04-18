const advanceScoreCalculation = (totalTime, points, questionStart, questionAnswered) => {
  console.log(totalTime, points, questionStart, questionAnswered)
  const elapsedTime = Math.ceil((questionAnswered - questionStart) / 1000)
  const scaling = 0.4;
  const remainingTime = totalTime - elapsedTime;
  const remainingTimePercentage = remainingTime / totalTime;
  return parseFloat((points * (1.0 + (remainingTimePercentage * scaling))).toFixed(2));
}

export default advanceScoreCalculation
