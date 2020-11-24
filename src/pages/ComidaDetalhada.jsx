import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchFood from '../servicesAPI/foodAPI';
import ReceitasContext from '../context/ReceitasContext';
import Recomended from '../components/Recomended';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';

function ComidaDetalhada({ match }) {
  const { setIsFetching, isFetching } = useContext(ReceitasContext);
  const [meal, setMeal] = useState([]);
  const { id } = match.params;
  const six = 6;

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = await fetchFood('byId', id);
      setMeal(...response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="detalhes">
      {isFetching
        ? <h2>Loading...</h2>
        : (
          <main className="detalhes-container">
            <header className="detalhes-header">
              <section className="detalhes-img">
                <img data-testid="recipe-photo" src={ meal.strMealThumb } alt="" />
              </section>
              <section className="detalhes-bar">
                <section className="detalhes-titles">
                  <h3 data-testid="recipe-title" className="detalhes-title">
                    { meal.strMeal }
                  </h3>
                  <h4 data-testid="recipe-category" className="detalhes-subtitle">
                    { meal.strCategory }
                  </h4>
                </section>
                <section className="detalhes-buttons">
                  <button
                    data-testid="share-btn"
                    type="button"
                    className="detalhes-share"
                  >
                    <img src={ shareIcon } alt="compartilhe" />
                  </button>
                  <button
                    data-testid="favorite-btn"
                    type="button"
                    className="detalhes-fav"
                  >
                    <img src={ heartIcon } alt="compartilhe" />
                  </button>
                </section>
              </section>
            </header>
            <article className="detalhes-article">
              <section className="detalhes-ingredients">
                {isFetching
                  ? <h2>Loading...</h2>
                  : Object.keys(meal).map((key, index) => (key.includes('strIngredient')
                    ? (
                      <p
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ index }
                      >
                        {meal[key]}
                      </p>
                    )
                    : ''))}
              </section>
              <section className="detalhes-instructions">
                <p data-testid="instructions">{meal.strInstructions}</p>
              </section>
              <section className="detalhes-video">
                <iframe
                  title={ `Como Fazer ${meal.strMeal}` }
                  data-testid="video"
                  width="560"
                  height="315"
                  src={ !meal.strYoutube
                    ? <h2>Loading...</h2>
                    : meal.strYoutube.replace('watch?v=', 'embed/') }
                  frameBorder="0"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </section>
              <section size="2" className="detalhes-list-recomended">
                {isFetching
                  ? <h2>Loading...</h2>
                  : <Recomended itemType="comidas" />}
              </section>
              <button data-testid="start-recipe-btn" type="button">
                iniciar receita
              </button>
            </article>
          </main>
        )}
    </div>
  );
}

ComidaDetalhada.propTypes = {
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

export default ComidaDetalhada;
