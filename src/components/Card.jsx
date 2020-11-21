import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card({ imagePath, itemName, id, itemType }) {
  return (
    <div className="card-container">
      <div className="card-datails">
        <Link className="card-details-link" to={ `/${itemType}/${id}` }>
          <div className="card-info">
            <h4 className="card-title">{itemName}</h4>
          </div>
          <img alt="recipe cover" className="card-image" src={ imagePath } />
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
};

export default Card;
