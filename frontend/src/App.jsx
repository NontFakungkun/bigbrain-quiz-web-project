import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPath } from './utils/Path';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import PlaygroundScreen from './screens/PlaygroundScreen';
import LoggedInRoute from './utils/LoggedInRoute';
import ProtectedRoute from './utils/ProtectedRoute';
import EditGameScreen from './screens/EditGameScreen';
import EditQuestionScreen from './screens/EditQuestionScreen';
import ResultScreen from './screens/ResultScreen';

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
            <Route path={MainPath.HOME} element={<PlaygroundScreen />} />
            <Route path={`${MainPath.EDITGAME}/:quizId`} element={<EditGameScreen />} />
            <Route path={`${MainPath.EDITQUESTION}/:quizId/:questionId`} element={<EditQuestionScreen />} />
            <Route path={MainPath.RESULT} element={<ResultScreen authed={true}/>} />
          </Route>
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
