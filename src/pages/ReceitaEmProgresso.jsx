import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ListaIngredientesEmProgresso from './ListaIngredientesEmProgresso';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import fetchDrink from '../servicesAPI/drinkAPI';
import FavoriteShareButtons from '../components/FavoriteShareButtons';

function ReceitaEmProgresso({ match }) {
  const { setIsFetching, isFetching, keyProps } = useContext(ReceitasContext);
  const type = (match.path.match('comidas')) ? 'meal' : 'drink';
  const [recipe, setRecipe] = useState('');
  const { id } = match.params;

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = (type === 'meal')
        ? await fetchFood('byId', id)
        : await fetchDrink('byId', id);
      setRecipe(...response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isFetching
        ? <h2>Loading...</h2>
        : (
          <main className="detalhes-main">
            <header className="detalhes-header">
              <section className="detalhes-img">
                <section className="detalhes-img-border">
                  <img
                    data-testid="recipe-photo"
                    src={ recipe[`str${keyProps[type]}Thumb`] }
                    alt=""
                  />
                </section>
              </section>
              <section className="detalhes-bar">
                <section className="detalhes-titles">
                  <h3 data-testid="recipe-title" className="detalhes-title">
                    { recipe[`str${keyProps[type]}`] }
                  </h3>
                  <h4 data-testid="recipe-category" className="detalhes-subtitle">
                    { recipe[type === 'meal' ? 'strCategory' : 'strAlcoholic'] }
                  </h4>
                </section>
                <FavoriteShareButtons recipe={ recipe } type={ type } />
              </section>
            </header>
            <article className="detalhes-article">
              { recipe !== '' ? (
                <ListaIngredientesEmProgresso recipe={ recipe } type={ type } />
              ) : <p>Loading...</p>}
              <section className="detalhes-instructions">
                <p data-testid="instructions">{recipe.strInstructions}</p>
              </section>
            </article>
          </main>
        )}
    </div>
  );
}

ReceitaEmProgresso.propTypes = {
  match: propTypes.shape({
    isExact: propTypes.bool,
    params: propTypes.shape({
      id: propTypes.string,
      path: propTypes.string,
      url: propTypes.string,
    }),
    path: propTypes.string,
    url: propTypes.string,
  }).isRequired,
};

export default ReceitaEmProgresso;
