import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';

function IngredientsList({ recipe, type }) {
  const { recipesDone, recipesInProgress,
    setRecipesInProgress } = useContext(ReceitasContext);
  const id = recipe[`id${(type === 'meal') ? 'Meal' : 'Drink'}`];
  const isDone = recipesDone.find((recipeId) => recipeId === id);
  let recipesInProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const keyConvert = recipesInProgressLS !== null ? 'cocktails' : 'drinks';
  recipesInProgressLS = recipesInProgressLS !== null
    ? recipesInProgressLS : recipesInProgress;
  const keyByType = (type === 'meal') ? 'meals' : keyConvert;
  const keyByTypeForGlobalState = (type === 'meal') ? 'meals' : 'drinks';
  const isProgress = Object.keys(recipesInProgressLS[keyByType])
    .find((recipeId) => recipeId === id);
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';

  const getIngredientsAndMeasure = () => {
    const recipesIngredientsWithMeasures = [];
    const ingredientes = Object.keys(recipe)
      .map((key) => (key.includes('strIngredient')
        ? recipe[key]
        : '')).filter((value) => value !== '' && value !== null);
    const medidas = Object.keys(recipe)
      .map((key) => (key.includes('strMeasure')
        ? recipe[key]
        : '')).filter((value) => value !== ' ' && value !== '' && value !== null);
    const zero = 0;
    let i = zero;
    for (i; i < ingredientes.length; i += 1) {
      recipesIngredientsWithMeasures[i] = {
        ingrediente: ingredientes[i],
        medida: medidas[i],
      };
    }
    return recipesIngredientsWithMeasures;
  };

  const execSetProgress = () => {
    if (isProgress !== id) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
      setRecipesInProgress((prevState) => ({
        ...prevState,
        [keyByTypeForGlobalState]: {
          ...prevState[keyByTypeForGlobalState],
          [id]: [
            ...getIngredientsAndMeasure()
              .map((ingredient) => ({ ingredient, checked: false })),
          ],
        },
      }));
    }
  };

  return (
    <div>
      <section className="detalhes-ingredients">
        { getIngredientsAndMeasure()
          .map((recipeKey, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {`${recipeKey.ingrediente}
              ${recipeKey.medida ? recipeKey.medida : ''}`}
            </p>
          ))}
      </section>
      {!isDone
      && (
        <Link className="card-details-link" to={ `/${urlByType}/${id}/in-progress` }>
          <button
            className="detalhes-new-recipe-btn"
            data-testid="start-recipe-btn"
            type="button"
            value="Iniciar Receita"
            onClick={ () => execSetProgress() }
          >
            {isProgress !== id ? 'Iniciar Receita' : 'Continuar Receita'}
          </button>
        </Link>
      )}
    </div>
  );
}

export default IngredientsList;

IngredientsList.propTypes = {
  recipe: propTypes.objectOf(propTypes.object).isRequired,
  type: propTypes.string.isRequired,
};
