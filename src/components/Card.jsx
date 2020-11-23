import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card({ imagePath, itemName, id, itemType, indexId }) {
  return (
    <div data-testid={ `${indexId}-recipe-card` } className="card-container">
      <div className="card-datails">
        <Link className="card-details-link" to={ `/${itemType}/${id}` }>
          <div data-testid={ `${indexId}-card-name` } className="card-info">
            <h4 className="card-title">{itemName}</h4>
          </div>
          <img
            data-testid={ `${indexId}-card-img` }
            alt="recipe cover"
            className="card-image"
            src={ imagePath }
          />
        </Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  imagePath: propTypes.string.isRequired,
  itemName: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  itemType: propTypes.string.isRequired,
  indexId: propTypes.number.isRequired,
};

export default Card;
