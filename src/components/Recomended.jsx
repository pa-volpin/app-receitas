import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import fetchDrink from '../servicesAPI/drinkAPI';
import fetchFood from '../servicesAPI/foodAPI';

function Recomended({ itemType }) {
  const [isFetchingLocal, setIsFetchingLocal] = useState(false);
  const [recomendations, setRecommendations] = useState([]);

  useEffect(() => {
    setIsFetchingLocal(true);
    const firstRequestAPI = async () => {
      const response = (itemType === 'comidas')
        ? await fetchDrink('itemName', '')
        : await fetchFood('itemName', '');
      setRecommendations(response);
      setIsFetchingLocal(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardRecomendation = (recomendation, indexId) => {
    const inversePrefix = { comidas: 'Drink', bebidas: 'Meal' };
    const { [`str${inversePrefix[itemType]}Thumb`]: imagePath,
      [`id${inversePrefix[itemType]}`]: id,
      [`str${inversePrefix[itemType]}`]: itemName } = recomendation;

    return (
      <div data-testid={ `${indexId}-recomendation-card` } className="card-container">
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
  };

  return (
    <div>
      { isFetchingLocal
        ? <h2>Loading...</h2>
        : (recomendations.map((recomendation, index) => ((index < 6)
          ? cardRecomendation(recomendation, index)
          : '')))}
    </div>
  );
}

Recomended.propTypes = {
  itemType: propTypes.string.isRequired,
};

export default Recomended;
