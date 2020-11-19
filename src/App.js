import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Comidas, Explorar } from './pages';

import ReceitasProvider from './context/ReceitasProvider';
import './App.css';

function App() {
  return (
    <ReceitasProvider>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/comidas" component={Comidas} />
        <Route exact path="/explorar" component={Explorar} />
      </Switch>
    </ReceitasProvider>
  );
}

export default App;
