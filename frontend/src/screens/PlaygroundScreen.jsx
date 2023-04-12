import React from 'react';
import { MainPath } from '../utils/Path';

const PlaygroundScreen = () => {
  return (
    <div>
        <h1>Playground</h1>
        <h4>Put anything you want to test here</h4>
        <a href={MainPath.LOGIN}>
          to Login Page
        </a>
    </div>

  );
};

export default PlaygroundScreen;
