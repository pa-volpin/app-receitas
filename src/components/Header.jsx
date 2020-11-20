import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header({ title }) {
  const { hidden, setHidden } = useContext(ReceitasContext);

  const handleHiddenInput = () => (hidden === true ? setHidden(false) : setHidden(true));

  return (
    <header className="header-container">
      <title data-testid="page-title" value={ title }>{title}</title>
      <Link to="/explorar" onClick={ handleHiddenInput } data-testid="search-input">
        <img data-testid="search-top-btn" src={ search } alt="" />
      </Link>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profile } alt="" />
      </Link>
      {hidden ? null : <input type="text" />}
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default Header;
