import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';

function Explorar() {
  const { hidden, setHidden } = useContext(ReceitasContext);

  const handleHiddenInput = () => (hidden ? setHidden(false) : setHidden(true));

  return (
    <div>
      <title data-testid="page-title">Explorar</title>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profile } alt="" />
      </Link>
      {hidden ? null : (
        <div>
          <Link to="/explorar" onClick={ handleHiddenInput }>
            <img data-testid="search-top-btn" src={ search } alt="" />
          </Link>
          <input type="text" data-testid="search-input" />
        </div>)}
    </div>
  );
}

export default Explorar;
