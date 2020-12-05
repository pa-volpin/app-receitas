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
        <Route path="/app-receitas-g20/bebidas/:id/in-progress" component={ ReceitaEmProgresso } />
        <Route path="/app-receitas-g20/comidas/:id/in-progress" component={ ReceitaEmProgresso } />
        <Route path="/app-receitas-g20/comidas/:id" component={ ReceitaDetalhada } />
        <Route path="/app-receitas-g20/bebidas/:id" component={ ReceitaDetalhada } />
        <Route path="/app-receitas-g20/comidas" component={ Comidas } />
        <Route path="/app-receitas-g20/bebidas" component={ Bebidas } />
        <Route
          path="/app-receitas-g20/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route
          path="/app-receitas-g20/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route
          path="/app-receitas-g20/explorar/comidas/area"
          component={ ExplorarComidasPorLocalOrigem }
        />
        <Route
          path="/app-receitas-g20/explorar/bebidas/area"
          component={ NotFound }
        />
        <Route path="/app-receitas-g20/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/app-receitas-g20/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route path="/app-receitas-g20/perfil" component={ Perfil } />
        <Route path="/app-receitas-g20/explorar/comidas" component={ ExplorarComidas } />
        <Route path="/app-receitas-g20/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/app-receitas-g20/explorar" component={ Explorar } />
        <Route exact path="/app-receitas-g20/" component={ Login } />
      </Switch>
    </ReceitasProvider>
  );
}

export default App;
