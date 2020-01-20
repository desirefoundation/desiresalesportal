import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import './Components/About/About'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Button variant="primary">Test</Button>
    </div>
  );
}

export default App;
