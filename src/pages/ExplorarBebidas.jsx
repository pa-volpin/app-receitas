import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import profile from '../images/profileIcon.svg';

function ExplorarBebidas() {
  return (
    <div>
      <title data-testid="page-title">Explorar Bebidas</title>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profile } alt="" />
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
