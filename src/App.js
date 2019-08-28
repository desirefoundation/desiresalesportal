import React from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom'

import './App.css';

import Login from './components/Login'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path='/' component = { Login }/>
            <Route exact path='/login' component = { Login }/>
            <Route exact path='/home' component = { Home } />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
