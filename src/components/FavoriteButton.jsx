import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ recipe, type }) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(ReceitasContext);

  // Configuração de chaves e id conforme tipo da receita
  const id = recipe[`id${(type === 'meal') ? 'Meal' : 'Drink'}`];
  // const keyByType = (type === 'meal') ? 'meals' : 'cocktails';
  // const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';

  // Recebe as receitas em progresso do local storage ou do estado global
  const favoriteRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const recipesInFavorite = (favoriteRecipesLS !== null)
    ? favoriteRecipesLS : favoriteRecipes;

  // Verificação se a receita está em progresso e se está feita
  // const isDone = recipesDone.find((recipeId) => recipeId === id);
  const recipeIsFavorite = recipesInFavorite
    .map((eachRecipe) => eachRecipe.id).find((eachId) => eachId === id) === id;

  useEffect(() => {
    console.log(recipeIsFavorite);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeIsFavorite]);

  // Ao clicar no coração
  const checkFavorite = () => {
    if (!recipeIsFavorite) {
      setFavoriteRecipes((prevState) => {
        const zero = 0;
        const favoritedRecipe = prevState
          .find((eachRecipe) => eachRecipe.id === id);
        const favoriteIndex = prevState.indexOf(favoritedRecipe);
        return ([
          ...prevState.slice(zero, favoriteIndex),
          {
            id,
            type: type === 'meal' ? 'comida' : 'bebida',
            area: recipe.strArea,
            category: recipe.strCategory,
            alcoholicOrNot: type === 'meal' ? '' : recipe.strAlcoholic,
            name: recipe[`str${(type === 'meal') ? 'Meal' : 'Drink'}`],
            image: recipe[`str${(type === 'meal') ? 'Meal' : 'Drink'}Thumb`],
            doneDate: new Date(),
            tags: [...recipe.strTags],
          },
          ...prevState.slice(favoriteIndex + 1),
        ]);
      });
    } else {
      setFavoriteRecipes((prevState) => {
        const zero = 0;
        const favoritedRecipe = prevState
          .find((eachRecipe) => eachRecipe.id === id);
        const favoriteIndex = prevState.indexOf(favoritedRecipe);
        return ([
          ...prevState.slice(zero, favoriteIndex),
          ...prevState.slice(favoriteIndex + 1),
        ]);
      });
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      className="detalhes-fav"
      onClick={ checkFavorite }
    >
      <img
        src={ recipeIsFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="compartilhe"
      />
    </button>
  );
}

export default FavoriteButton;

FavoriteButton.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
  type: propTypes.string.isRequired,
};
