import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';

function SearchBar({ requestAPI }) {
  const { setSearchType, setSearchInput } = useContext(ReceitasContext);

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
            onClick={ () => setSearchType('ingredient') }
            type="radio"
            defaultChecked
            name="radio"
            id="ingrediente"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            onClick={ () => setSearchType('firstLetter') }
            data-testid="first-letter-search-radio"
            type="radio"
            name="radio"
            id="first-letter"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            onClick={ () => setSearchType('itemName') }
            data-testid="name-search-radio"
            type="radio"
            name="radio"
            id="name"
          />
        </label>
        <button
          onClick={ requestAPI }
          type="button"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </nav>
    </div>
  );
}

SearchBar.defaultProps = {
  requestAPI: () => console.log('searchBar'),
};

SearchBar.propTypes = {
  requestAPI: propTypes.func,
};

export default SearchBar;
