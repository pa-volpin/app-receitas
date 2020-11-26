import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login, Comidas, Perfil, Explorar, Bebidas, ReceitasFeitas,
  ReceitasFavoritas, ExplorarComidas, ExplorarBebidas,
  ExplorarBebidasIngredientes, ExplorarComidasIngredientes, ExplorarComidasPorLocalOrigem,
  ComidaDetalhada, ComidaEmProgresso, BebidaDetalhada, BebidaEmProgresso,
} from './pages';

import ReceitasProvider from './context/ReceitasProvider';
import './App.css';
import './stylesCSS/Card.css';
import './stylesCSS/Recomended.css';
import './stylesCSS/PageDetalhada.css';
import './stylesCSS/DetalhesResponsive.css';

function App() {
  return (
    <ReceitasProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas/:id" component={ ComidaDetalhada } />
        <Route exact path="/bebidas/:id" component={ BebidaDetalhada } />
        <Route exact path="/bebidas/:id/in-progress" component={ BebidaEmProgresso } />
        <Route exact path="/comidas/:id/in-progress" component={ ComidaEmProgresso } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExplorarComidasPorLocalOrigem }
        />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explorar } />
      </Switch>
    </ReceitasProvider>
  );
}

export default App;
