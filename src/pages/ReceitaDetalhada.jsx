import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import IngredientsList from './IngredientsList';
import ReceitasContext from '../context/ReceitasContext';
import Recomended from '../components/Recomended';
import shareIcon from '../images/shareIcon.svg';
import fetchFood from '../servicesAPI/foodAPI';
import fetchDrink from '../servicesAPI/drinkAPI';
import CopyToClipBoard from '../components/CopyToClipBoard';
import FavoriteButton from '../components/FavoriteButton';

function ReceitaDetalhada({ match }) {
  const { setIsFetching, isFetching, keyProps } = useContext(ReceitasContext);
  const type = (match.path.match('comidas')) ? 'meal' : 'drink';
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';
  const [recipe, setRecipe] = useState([]);
  const { id } = match.params;
  const textTime = 3000;
  const [copied, setClipboard] = CopyToClipBoard(textTime);
  // const idPathName = history.location.pathname.split('/')[2];

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
                <section className="detalhes-buttons">
                  <button
                    data-testid="share-btn"
                    type="button"
                    className="detalhes-share"
                    onClick={ () => setClipboard(`/${urlByType}/${id}`) }
                  >
                    <img src={ shareIcon } alt="compartilhe" />
                    { copied ? <p>Link copiado!</p> : true }
                  </button>
                  <FavoriteButton recipe={ recipe } type={ type } />
                </section>
              </section>
            </header>
            <article className="detalhes-article">
              <IngredientsList recipe={ recipe } type={ type } />
              <section className="detalhes-instructions">
                <p data-testid="instructions">{recipe.strInstructions}</p>
              </section>
              {type === 'meal'
              && (
                <section className="detalhes-video">
                  <iframe
                    title={ `Como Fazer ${recipe[`str${keyProps[type]}`]}` }
                    data-testid="video"
                    width="560"
                    height="315"
                    src={ !recipe.strYoutube
                      ? <h2>Loading...</h2>
                      : recipe.strYoutube.replace('watch?v=', 'embed/') }
                    frameBorder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </section>
              )}
              <section className="detalhes-list-recomended">
                <Recomended itemType={ type === 'meal' ? 'bebidas' : 'comidas' } />
              </section>
            </article>
          </main>
        )}
    </div>
  );
}

ReceitaDetalhada.propTypes = {
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

export default ReceitaDetalhada;
