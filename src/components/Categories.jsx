import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import fetchDrink from '../servicesAPI/drinkAPI';

function Categories({ type }) {
  const [categories, setCategories] = useState([]);
  const { setFilter } = useContext(ReceitasContext);

  useEffect(() => {
    const firstRequestAPI = async () => {
      const response = (type === 'meals')
        ? await fetchFood('categories', '')
        : await fetchDrink('categories', '');
      setCategories(response);
    };
    firstRequestAPI();
  }, []);

  return (
    <div>
      { categories.map(({ strCategory }, index) => (
        (index < 5)
          ? <button
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              value={ strCategory }
              onClick={ ({ target }) => setFilter(target.value) }
          >
            { strCategory }
          </button>
          : ''
      )) }
    </div>
  );
}

export default Categories;

Categories.propTypes = {
  type: propTypes.string.isRequired,
};
