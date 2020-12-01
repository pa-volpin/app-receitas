import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';

function Card({ imagePath, itemName, id, itemType, titlePage,
  indexId, cardType, origin, category, alcoholic, date, tagsRecipe }) {
  const iconsAccordingPage = (title) => {
    if (title === 'Receitas Favoritas') {
      return (
        <section className="card-buttons">
          <button
            data-testid={ `${indexId}-horizontal-share-btn` }
            type="button"
            className="card-share"
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="compartilhe" />
          </button>
          <button
            data-testid={ `${indexId}-${cardType}-favorite-btn` }
            type="button"
            className="card-fav"
            src={ heartIcon }
          >
            <img src={ heartIcon } alt="compartilhe" />
          </button>
        </section>
      );
    }
    return (
      <section className="card-buttons">
        <button
          data-testid={ `${indexId}-horizontal-share-btn` }
          type="button"
          className="card-share"
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="compartilhe" />
        </button>
      </section>
    );
  };

  const foodOrDrink = () => {
    if (origin || category) {
      return (
        <span data-testid={ `${indexId}-${cardType}-top-text` }>
          {`${origin} - `}
          {`${category}`}
        </span>
      );
    }
    if (alcoholic) {
      return (
        <span data-testid={ `${indexId}-${cardType}-top-text` }>
          {alcoholic}
        </span>
      );
    }
  };

  return (
    <div data-testid={ `${indexId}-${cardType}-card` } className="card-container">
      <div className="card-datails">
        <Link className="card-details-link" to={ `/${itemType}/${id}` }>
          <div className="card-info">
            {foodOrDrink()}
            <h4
              data-testid={ `${indexId}-${cardType}-name` }
              className="card-title"
            >
              {itemName}
            </h4>
            <div className="card-date-container">
              <div
                data-testid={ `${indexId}-${cardType}-done-date` }
                className="card-date"
              >
                {date}
              </div>
            </div>
          </div>
          <img
            data-testid={ `${indexId}-${cardType}-image` }
            alt="recipe cover"
            className="card-image"
            src={ imagePath }
          />
        </Link>
        <div className="card-clickable">
          <div className="card-icons">
            {iconsAccordingPage(titlePage)}
          </div>
          <div className="card-tags">
            {tagsRecipe}
          </div>
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  date: '',
  tagsRecipe: [],
};

Card.propTypes = {
  imagePath: propTypes.string.isRequired,
  itemName: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  itemType: propTypes.string.isRequired,
  indexId: propTypes.number.isRequired,
  cardType: propTypes.string.isRequired,
  origin: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  alcoholic: propTypes.string.isRequired,
  titlePage: propTypes.string.isRequired,
  tagsRecipe: propTypes.arrayOf(propTypes.shape()),
  date: propTypes.string,
};

export default Card;
