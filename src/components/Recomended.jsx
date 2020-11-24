import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import fetchDrink from '../servicesAPI/drinkAPI';
import fetchFood from '../servicesAPI/foodAPI';

function Recomended({ imagePath, itemName, id, itemType, indexId }) {
  const { setIsFetching, setRecipesDrinks, setRecipesMeals,
    recipesDrinks, recipesMeals } = useContext(ReceitasContext);

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      if (itemType === 'comidas') {
        await fetchDrink('itemName', '').then((r) => setRecipesDrinks(r));
      } else {
        await fetchFood('itemName', '').then((r) => setRecipesMeals(r));
      }
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recomendations = (itemType);

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
}

Recomended.propTypes = {
  imagePath: propTypes.string.isRequired,
  itemName: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  itemType: propTypes.string.isRequired,
  indexId: propTypes.number.isRequired,
};

export default Recomended;
