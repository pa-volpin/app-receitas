import React from 'react';
import { Link } from 'react-router-dom';

import profile from '../images/profileIcon.svg';

function ExplorarComidasIngredientes() {
  return (
    <div>
      <title data-testid="page-title">Explorar Ingredientes</title>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={profile} alt="" />
      </Link>
    </div>
  );
}

export default ExplorarComidasIngredientes;
