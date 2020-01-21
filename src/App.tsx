import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login }></Route>
          <Route exact path="/login" component={ Login }></Route>
          <Route path="/dashboard" component={ Dashboard }></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
