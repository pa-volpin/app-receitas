import React, { useState, useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const { setSearchType, fetchApi } = useContext(ReceitasContext);

  return (
    <div>
      <nav>
        <input
          onChange={ ({ target }) => setSearchInput(target.value) }
          type="text"
          data-testid="search-input"
        />
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
            checked="checked"
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

export default SearchBar;
