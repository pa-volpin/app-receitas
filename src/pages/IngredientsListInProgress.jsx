import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';

function IngredientsListInProgress({ recipeId, type }) {
  const { setRecipesDone, setRecipesInProgress,
    recipesInProgress } = useContext(ReceitasContext);
  const recipeType = (type === 'meal') ? 'comidas' : 'bebidas';
  const keyByTypeForGlobalState = (type === 'meal') ? 'meals' : 'drinks';

  const list = recipesInProgress[keyByTypeForGlobalState][recipeId];

  function execSetDone() {
    setRecipesDone((prevState) => ([
      ...prevState,
      recipeId,
    ]));
    delete recipesInProgress[keyByTypeForGlobalState][recipeId];
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  }

  const check = ({ target }) => {
    const { value, checked } = target;
    const zero = 0;
    setRecipesInProgress((prevState) => {
      const objIngThatContainsIngName = prevState[keyByTypeForGlobalState][recipeId]
        .find((obj) => obj.ingredient.ingrediente === value);
      const ingredientIndex = prevState[keyByTypeForGlobalState][recipeId]
        .indexOf(objIngThatContainsIngName);
      return ({
        ...prevState,
        [keyByTypeForGlobalState]: {
          ...prevState[keyByTypeForGlobalState],
          [recipeId]: [
            ...prevState[keyByTypeForGlobalState][recipeId].slice(zero, ingredientIndex),
            { ...prevState[keyByTypeForGlobalState][recipeId][ingredientIndex], checked },
            ...prevState[keyByTypeForGlobalState][recipeId].slice(ingredientIndex + 1),
          ],
        },
      });
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  };

  return (
    <div>
      <section className="detalhes-ingredients">
        { list
          .map((ingredientObj, index) => {
            const { ingredient, checked } = ingredientObj;
            return (
              <label key={ index } htmlFor={ index }>
                <input
                  id={ index }
                  type="checkbox"
                  data-testid={ `${index}-ingredient-step` }
                  key={ index }
                  onClick={ ({ target }) => check({ target }) }
                  checked={ checked }
                  value={ `${ingredient.ingrediente}` }
                />
                {`${ingredient.ingrediente}
            ${ingredient.medida ? ingredient.medida : ''}`}
              </label>
            );
          })}
      </section>
      <div>
        <Link className="card-details-link" to={ `/${recipeType}` }>
          <button
            className="detalhes-new-recipe-btn"
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ () => execSetDone() }
          >
            Finalizar Receita
          </button>
        </Link>
        <Link to={ `/${recipeType}` }>Salvar Para Mais Tarde</Link>
      </div>
    </div>
  );
}

export default IngredientsListInProgress;

IngredientsListInProgress.propTypes = {
  recipeId: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
};
