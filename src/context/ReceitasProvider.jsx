import React, { useState } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [email, setEmail] = useState('');
  const [hidden, setHidden] = useState(true);
  const [responseAPI, setResponseAPI] = useState({
    recipes: [],
  });
  const [searchType, setSearchType] = useState({
    ingrediente: false,
    first: false,
    name: false,
  });

  async function fetchFood(type) {
    const { ingrediente, first, name } = searchType;
    const comida = 'themealdb';
    const searchIngred = `https://www.${comida}.com/api/json/v1/1/filter.php?i=`;
    const searchName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const searchFirst = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
    let urlComidas = '';
    if (ingrediente) urlComidas = `${searchIngred}${type}`;
    if (name) urlComidas = `${searchName}${type}`;
    if (first) urlComidas = `${searchFirst}${type}`;
    const response = await fetch(urlComidas);
    const json = await response.json();
    return setResponseAPI({ recipes: json });
  }

  async function fetchDrink(type) {
    const { ingrediente, first, name } = searchType;
    const bebidaIngred = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    const bebidaName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const bebidaFirst = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
    let urlBebidas = '';
    if (ingrediente) urlBebidas = `${bebidaIngred}${type}`;
    if (name) urlBebidas = `${bebidaName}${type}`;
    if (first) urlBebidas = `${bebidaFirst}${type}`;
    const response = await fetch(urlBebidas);
    const json = await response.json();
    return setResponseAPI({ recipes: json });
  }

  const infos = {
    email,
    setEmail,
    hidden,
    setHidden,
    setSearchType,
    responseAPI,
    fetchFood,
    fetchDrink,
  };

  return (
    <ReceitasContext.Provider value={ infos }>
      {children}
    </ReceitasContext.Provider>
  );
}

ReceitasProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default ReceitasProvider;
