import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { MainPath } from './utils/Path';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoggedInRoute from './utils/LoggedInRoute';
import ProtectedRoute from './utils/ProtectedRoute';
import EditGameScreen from './screens/EditGameScreen';
import EditQuestionScreen from './screens/EditQuestionScreen';
import JoinGameScreen from './screens/JoinGameScreen';
import PlayGameScreen from './screens/PlayGameScreen';
import ResultScreen from './screens/ResultScreen';
// import PlaygroundScreen from './screens/PlaygroundScreen';

function App () {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<LoggedInRoute />}>
            <Route path={MainPath.LOGIN} element={<LoginScreen />} />
            <Route path={MainPath.REGISTER} element={<RegisterScreen />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={MainPath.DASHBOARD} element={<DashboardScreen />} />
            <Route path={MainPath.HOME} element={<Navigate to={MainPath.DASHBOARD} replace />} />
            <Route path={`${MainPath.EDITGAME}/:quizId`} element={<EditGameScreen />} />
            <Route path={`${MainPath.EDITQUESTION}/:quizId/:questionId`} element={<EditQuestionScreen />} />
            <Route path={`${MainPath.RESULT}/:quizzId/:sessionId`} element={<ResultScreen />} />
          </Route>
          <Route path={`${MainPath.JOINGAME}/:sessionId`} element={<JoinGameScreen />} />
          <Route path={`${MainPath.PLAYGAME}/:sessionId/:playerId`} element={<PlayGameScreen />} />
          <Route path="*" element={
            <div>
              <h1>404 Page not found</h1>
            </div>
          } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
