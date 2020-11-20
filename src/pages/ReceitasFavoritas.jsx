import React from 'react';
import { Link } from 'react-router-dom';

import profile from '../images/profileIcon.svg';

function ReceitasFavoritas() {
  return (
    <div>
      <title data-testid="page-title">Receitas Favoritas</title>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={profile} alt="" />
      </Link>
    </div>
  );
}

export default ReceitasFavoritas;
