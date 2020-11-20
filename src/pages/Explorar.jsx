import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';

function Explorar() {
  const [searchInput, setSearchInput] = useState('');
  const {
    hidden,
    setHidden,
    setSearchType,
    fetchApi,
  } = useContext(ReceitasContext);
  const handleHiddenInput = () => (hidden ? setHidden(false) : setHidden(true));

  return (
    <div>
      <header>
        <title data-testid="page-title">Explorar</title>
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profile } alt="" />
        </Link>
      </header>
      <nav>
        {hidden ? null : (
          <div>
            <Link to="/explorar" onClick={ handleHiddenInput }>
              <img data-testid="search-top-btn" src={ search } alt="" />
            </Link>
            <input
              onChange={ ({ target }) => setSearchInput(target.value) }
              type="text"
              data-testid="search-input"
            />
          </div>)}
        <label htmlFor="ingrediente">
          Ingrediente
          <input
            data-testid="ingredient-search-radio"
            onClick={ () => setSearchType({
              ingrediente: true,
              first: false,
              name: false,
            }) }
            type="radio"
            name="radio"
            id="ingrediente"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            onClick={ () => setSearchType({
              ingrediente: false,
              first: true,
              name: false,
            }) }
            data-testid="first-letter-search-radio"
            type="radio"
            name="radio"
            id="first-letter"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            onClick={ () => setSearchType({
              ingrediente: false,
              first: false,
              name: true,
            }) }
            data-testid="name-search-radio"
            type="radio"
            name="radio"
            id="name"
          />
        </label>
        <button
          onClick={ () => fetchApi(searchInput) }
          type="button"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </nav>
    </div>
  );
}

export default Explorar;
