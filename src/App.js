import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login, Comidas, Perfil, Explorar, Bebidas, ReceitasFeitas,
  ReceitasFavoritas, ExplorarComidas, ExplorarBebidas,
  ExplorarBebidasIngredientes, ExplorarComidasIngredientes,
  ExplorarComidasPorLocalOrigem, ReceitaDetalhada } from './pages';
import NotFound from './pages/NotFound';

import ReceitasProvider from './context/ReceitasProvider';
import './App.css';
import './stylesCSS/Card.css';
import './stylesCSS/Login.css';
import './stylesCSS/Profile.css';
import './stylesCSS/Recomended.css';
import './stylesCSS/InitialPages.css';
import './stylesCSS/PageDetalhada.css';
import './stylesCSS/ExplorarPages.css';
import './stylesCSS/ResponsiveApp.css';
import './stylesCSS/ReceitasDoneFav.css';
import './stylesCSS/DetalhesResponsive.css';
import './stylesCSS/RecomendedResponsive.css';
import ReceitaEmProgresso from './pages/ReceitaEmProgresso';

function App() {
  return (
    <ReceitasProvider>
      <Switch>
        <Route
          path="/bebidas/:id/in-progress"
          component={ ReceitaEmProgresso }
        />
        <Route
          path="/comidas/:id/in-progress"
          component={ ReceitaEmProgresso }
        />
        <Route path="/comidas/:id" component={ ReceitaDetalhada } />
        <Route path="/bebidas/:id" component={ ReceitaDetalhada } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route
          path="/explorar/comidas/area"
          component={ ExplorarComidasPorLocalOrigem }
        />
        <Route
          path="/explorar/bebidas/area"
          component={ NotFound }
        />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/explorar/comidas" component={ ExplorarComidas } />
        <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/explorar" component={ Explorar } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </ReceitasProvider>
  );
}

export default App;
