import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';

function Perfil() {
  return (
    <main>
      <title data-testid="page-title">Perfil</title>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={profile} alt="" />
      </Link>
    </main>
  );
}

export default Perfil;
