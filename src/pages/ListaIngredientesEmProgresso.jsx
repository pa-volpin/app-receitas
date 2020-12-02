import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';

function ListaIngredientesEmProgresso({ recipe, type }) {
  const { setRecipesDone,
    recipesInProgress, setRecipesInProgress,
    isFetching, setIsFetching } = useContext(ReceitasContext);

  // const [isCheckBox, setIsCheckBox] = useState(false);

  // Configuração de chaves e id conforme tipo da receita
  const id = recipe[`id${(type === 'meal') ? 'Meal' : 'Drink'}`];
  const keyByType = (type === 'meal') ? 'meals' : 'cocktails';
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';

  // Recebe as receitas em progresso do local storage ou do estado global
  const recipesInProgLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipesInProg = (recipesInProgLS !== null) ? recipesInProgLS : recipesInProgress;

  // Verificação se a receita está em progresso e se está feita
  // const isDone = recipesDone.find((recipeId) => recipeId === id);
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
      checked: '',
    }));

    return ingredients;
  };

  // Ao montar o componente
  useEffect(() => {
    setIsFetching(true);
    if (!recipesIsInProg) {
      setRecipesInProgress((prevState) => ({
        ...prevState,
        [keyByType]: {
          ...prevState[keyByType],
          [id]: createIngredientList(),
        },
      }));
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ao finalizar receita atualiza o estado global e o local storage
  function finishRecipe() {
    setRecipesDone((prevState) => ([...prevState, id]));
    delete recipesInProgress[keyByType][id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  }

  // Ao dar check atualiza o estado global e o local storage
  const check = ({ target }) => {
    console.log(target);
    console.log(target.value);
    const { value, checked } = target;
    const isChecked = !(checked === false);
    console.log(isChecked);
    console.log(checked);
    const zero = 0;
    setRecipesInProgress((prevState) => {
      if (prevState) {
        const objIngThatContainsIngName = prevState[keyByType][id]
          .find((ingredient) => ingredient.name === value);

        const ingredientIndex = prevState[keyByType][id]
          .indexOf(objIngThatContainsIngName);
        return ({
          ...prevState,
          [keyByType]: {
            ...prevState[keyByType],
            [id]: [
              ...prevState[keyByType][id].slice(zero, ingredientIndex),
              { ...prevState[keyByType][id][ingredientIndex], checked: isChecked },
              ...prevState[keyByType][id].slice(ingredientIndex + 1),
            ],
          },
        });
      }
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  };

  const list = (recipesIsInProg) ? recipesInProg[keyByType][id] : createIngredientList();

  const shouldDisable = list && list
    .map((ingredient) => ingredient.checked).includes(false);

  return (
    <div>
      {list ? (
        <div>
          <section className="detalhes-ingredients">
            {!isFetching && list
              .map((ingredient, index) => {
                const { name, measure, checked } = ingredient;
                return (
                  <label
                    key={ index }
                    htmlFor={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      id={ index }
                      key={ index }
                      type="checkbox"
                      onChange={ ({ target }) => check({ target }, index) }
                      checked={ checked }
                      value={ name }
                    />
                    {`${name} ${measure}`}
                  </label>
                );
              })}
          </section>
          <div>
            {list
            && (
              <Link className="card-details-link" to={ `/${urlByType}` }>
                <button
                  className="detalhes-new-recipe-btn"
                  data-testid="finish-recipe-btn"
                  type="button"
                  onClick={ () => finishRecipe() }
                  disabled={ shouldDisable }
                >
                  Finalizar Receita
                </button>
              </Link>
            )}
            <Link to={ `/${urlByType}` }>Salvar Para Mais Tarde</Link>
          </div>
        </div>
      ) : <div>loading</div>}
    </div>
  );
}

export default ListaIngredientesEmProgresso;

ListaIngredientesEmProgresso.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
  type: propTypes.string.isRequired,
};
