import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';

function IngredientsList({ recipe, type }) {
  const { recipesDone, recipesInProgress } = useContext(ReceitasContext);

  // Configuração de chaves e id conforme tipo da receita
  const id = recipe[`id${(type === 'meal') ? 'Meal' : 'Drink'}`];
  const keyByType = (type === 'meal') ? 'meals' : 'cocktails';
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';

  // Recebe as receitas em progresso do local storage ou do estado global
  const recipesInProgLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipesInProg = (recipesInProgLS !== null) ? recipesInProgLS : recipesInProgress;

  // Verificação se a receita está em progresso e se está feita
  const isDone = recipesDone.find((recipeId) => recipeId === id);
  const recipesIsInProg = Object.keys(recipesInProg[keyByType])
    .find((recipeId) => recipeId === id) === id;

  // Criação do array de ingredientes com o controle checked
  const createIngredientList = () => {
    const keys = Object.keys(recipe);
    const ingredientsName = keys.reduce((array, key) => {
      const str = recipe[key];
      const condition = (key.includes('strIngredient') && str !== '' && str !== null);
      return (condition) ? array.concat(str) : array;
    }, []);

    const measures = keys.reduce((array, key) => {
      const str = (recipe[key] !== ' ' && recipe[key] !== null) ? recipe[key] : '';
      const condition = key.includes('strMeasure');
      return (condition) ? array.concat(str) : array;
    }, []);

    const ingredients = ingredientsName.map((name, index) => ({
      name,
      measure: measures[index],
    }));

    return ingredients;
  };

  const list = createIngredientList();

  return (
    <div>
      <section className="detalhes-ingredients">
        { list
          .map((ingredient, index) => {
            const { name, measure } = ingredient;
            return (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`${name}
                ${measure}`}
              </p>
            );
          })}
      </section>
      {!isDone
      && (
        <Link className="card-details-link" to={ `/${urlByType}/${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="detalhes-new-recipe-btn"
          >
            {!recipesIsInProg ? 'Iniciar Receita' : 'Continuar Receita'}
          </button>
        </Link>
      )}
    </div>
  );
}

export default IngredientsList;

IngredientsList.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
  type: propTypes.string.isRequired,
};
