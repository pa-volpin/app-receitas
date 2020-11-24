import React, { useState } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [email, setEmail] = useState('');
  const [hidden, setHidden] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [recipesMeals, setRecipesMeals] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const [searchType, setSearchType] = useState('ingredient');
  const [disabledProfileIcon, setDisabledProfileIcon] = useState(false);
  const [disabledSearchIcon, setDisabledSearchIcon] = useState(false);
  const [titleHeader, setTitleHeader] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filterFood, setFilterFood] = useState('');
  const [filterDrink, setFilterDrink] = useState('');
  const [executeFilter, setExecuteFilter] = useState(false);
  const [filterDisabled, setFilterDisabled] = useState(false);

  const contextValue = {
    email,
    setEmail,
    hidden,
    setHidden,
    searchType,
    setSearchType,
    recipesMeals,
    setRecipesMeals,
    recipesDrinks,
    setRecipesDrinks,
    disabledProfileIcon,
    setDisabledProfileIcon,
    disabledSearchIcon,
    setDisabledSearchIcon,
    titleHeader,
    setTitleHeader,
    showSearchBar,
    setShowSearchBar,
    searchInput,
    setSearchInput,
    isFetching,
    setIsFetching,
    filterFood,
    setFilterFood,
    filterDrink,
    setFilterDrink,
    executeFilter,
    setExecuteFilter,
    filterDisabled,
    setFilterDisabled,
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
