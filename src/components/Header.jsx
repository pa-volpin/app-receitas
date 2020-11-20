import React from 'react';
import { Link } from 'react-router-dom';

import propTypes from 'prop-types';

import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <header className="header-container">
      <title data-testid="page-title" value={title}>{title}</title>
      <Link to="/explorar">
        <img data-testid="search-top-btn" src={search} alt="" />
      </Link>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={profile} alt="" />
      </Link>
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default Header;
