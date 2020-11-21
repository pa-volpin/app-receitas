import React, { useState } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [email, setEmail] = useState('');
  const [hidden, setHidden] = useState(true);
  const [recipes, setRecipes] = useState({
    meals: [],
    cockTails: [],
  });
  const [searchType, setSearchType] = useState({
    ingrediente: true,
    first: false,
    name: false,
  });

  const contextValue = {
    email,
    setEmail,
    hidden,
    setHidden,
    searchType,
    setSearchType,
    recipes,
    setRecipes,
  };

  return (
    <ReceitasContext.Provider value={ contextValue }>
      {children}
    </ReceitasContext.Provider>
  );
}

ReceitasProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default ReceitasProvider;
