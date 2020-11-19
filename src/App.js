import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

import ReceitasProvider from './context/ReceitasProvider';
import './App.css';

function App() {
  return (
    <ReceitasProvider>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </ReceitasProvider>
  );
}

export default App;
