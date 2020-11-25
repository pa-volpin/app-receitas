import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchDrink from '../servicesAPI/drinkAPI';
import ReceitasContext from '../context/ReceitasContext';
import Recomended from '../components/Recomended';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';

function BebidaDetalhada({ match }) {
  const { setIsFetching, isFetching } = useContext(ReceitasContext);
  const [drink, setDrink] = useState([]);
  const { id } = match.params;

  function getKeys() {
    const recipesIngredientsMeasures = [];
    const ingredientes = Object.keys(drink)
      .map((key) => (key.includes('strIngredient')
        ? drink[key]
        : '')).filter((value) => value !== '' && value !== null);
    const medidas = Object.keys(drink)
      .map((key) => (key.includes('strMeasure')
        ? drink[key]
        : '')).filter((value) => value !== '' && value !== null);
    const zero = 0;
    let i = zero;
    for (i; i < ingredientes.length; i += 1) {
      recipesIngredientsMeasures[i] = {
        ingrediente: ingredientes[i],
        medida: medidas[i],
      };
    }
    return recipesIngredientsMeasures;
  }

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = await fetchDrink('byId', id);
      setDrink(...response);
      setIsFetching(false);
      console.log(response);
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
                  <img data-testid="recipe-photo" src={ drink.strDrinkThumb } alt="" />
                </section>
              </section>
              <section className="detalhes-bar">
                <section className="detalhes-titles">
                  <h3 data-testid="recipe-title" className="detalhes-title">
                    { drink.strDrink }
                  </h3>
                  <h4 data-testid="recipe-category" className="detalhes-subtitle">
                    { drink.strAlcoholic }
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
                { getKeys()
                  .map((drinkKey, index) => (
                    <p
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ index }
                    >
                      {`${drinkKey.ingrediente}
                        ${' '}${drinkKey.medida ? drinkKey.medida : ''}`}
                    </p>
                  ))}
              </section>
              <section className="detalhes-instructions">
                <p data-testid="instructions">{drink.strInstructions}</p>
              </section>
              <section className="detalhes-list-recomended">
                <Recomended itemType="bebidas" />
              </section>
            </article>
            <button
              className="detalhes-new-recipe-btn"
              data-testid="start-recipe-btn"
              type="button"
            >
              iniciar receita
            </button>
          </main>
        )}
    </div>
  );
}

BebidaDetalhada.propTypes = {
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

export default BebidaDetalhada;
