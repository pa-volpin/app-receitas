import React, { useState, useEffect } from 'react';
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
  const [filterIngredient, setFilterIngredient] = useState('');
  const [filterDrink, setFilterDrink] = useState('');
  const [executeFilter, setExecuteFilter] = useState(false);
  const [filterDisabled, setFilterDisabled] = useState(false);
  const [recipesDone, setRecipesDone] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState({
    cocktails: {},
    meals: {},
  });
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const keyProps = { meal: 'Meal', drink: 'Drink' };
  const keyURL = { meal: 'comidas', drink: 'bebidas' };
  const keyObj = { meal: 'meals', drink: 'drinks' };

  // RECOVER====================================================================
  const [isRecovering, setIsRecovering] = useState(true);

  // Mount
  // Adicionar 1 if dentro do Mount para cada estado global necessário
  useEffect(() => {
    const recipesInProgLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgLS !== null && isRecovering) setRecipesInProgress(recipesInProgLS);
    const recipesDoneLS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesDoneLS !== null && isRecovering) setRecipesDone(recipesDoneLS);
    setIsRecovering(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update
  // Replicar 1 Update para cada estado global necessário
  useEffect(() => {
    if (!isRecovering) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipesInProgress]);
  // ===========================================================================

  useEffect(() => {
    if (!isRecovering) {
      localStorage.setItem('doneRecipes', JSON.stringify(recipesDone));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipesDone]);

  function renderEmail(param) {
    return (
      <div>
        {param
          ? (
            <p data-testid="profile-email">{email}</p>
          )
          : (
            <h3 data-testid="profile-email">
              {JSON.parse(localStorage.getItem('user')).email}
            </h3>
          )}
      </div>
    );
  }

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
    filterIngredient,
    setFilterIngredient,
    filterDrink,
    setFilterDrink,
    executeFilter,
    setExecuteFilter,
    filterDisabled,
    setFilterDisabled,
    recipesDone,
    setRecipesDone,
    recipesInProgress,
    setRecipesInProgress,
    keyProps,
    keyObj,
    keyURL,
    renderEmail,
    favoriteRecipes,
    setFavoriteRecipes,
    isRecovering,
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
