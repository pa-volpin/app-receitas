import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import CopyToClipBoard from './CopyToClipBoard';

function FavoriteButton({ recipe, type }) {
  const { favoriteRecipes, setFavoriteRecipes,
    isFetching, setIsFetching } = useContext(ReceitasContext);
  const textTime = 3000;
  const [copied, setClipboard] = CopyToClipBoard(textTime);

  // Configuração de chaves e id conforme tipo da receita
  const id = recipe[`id${(type === 'meal') ? 'Meal' : 'Drink'}`];
  // const keyByType = (type === 'meal') ? 'meals' : 'cocktails';
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';

  // Recebe as receitas em progresso do local storage ou do estado global
  // const favoriteRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // const recipesInFavorite = (favoriteRecipesLS !== null)
  //   ? favoriteRecipesLS : favoriteRecipes;

  // Verificação se a receita está em progresso e se está feita
  // const isDone = recipesDone.find((recipeId) => recipeId === id);
  const [isFavorite, setIsFavorite] = useState('');

  // Ao montar
  useEffect(() => {
    setIsFetching(true);
    const favoriteRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const recipesInFavorite = (favoriteRecipesLS !== null)
      ? favoriteRecipesLS : favoriteRecipes;

    const recipeIsAlreadyFavorite = recipesInFavorite
      .map((eachRecipe) => eachRecipe.id).find((eachId) => eachId === id) === id;

    setIsFavorite(recipeIsAlreadyFavorite);
    setIsFetching(false);
  }, []);

  // Ao clicar no coração
  const checkFavorite = () => setIsFavorite((prevState) => !prevState);

  // Atualiza o estado global que o estado local mudar
  useEffect(() => {
    if (isFavorite) {
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
            tags: recipe.strTags,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite]);

  if (favoriteRecipes !== [] && isFavorite !== '') {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  return (
    <section className="detalhes-buttons">
      {!isFetching
      && (
        <button
          data-testid="favorite-btn"
          type="button"
          className="detalhes-fav"
          onClick={ checkFavorite }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="compartilhe"
          />
        </button>
      )}
      <button
        data-testid="share-btn"
        type="button"
        className="detalhes-share"
        onClick={ () => setClipboard(`/${urlByType}/${id}`) }
      >
        <img src={ shareIcon } alt="compartilhe" />
        { copied ? <span className="share-copiado">Link copiado!</span> : true }
      </button>
    </section>
  );
}

export default FavoriteButton;

FavoriteButton.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
  type: propTypes.string.isRequired,
};
