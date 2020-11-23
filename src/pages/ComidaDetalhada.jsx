import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchFood from '../servicesAPI/foodAPI';
import ReceitasContext from '../context/ReceitasContext';

function ComidaDetalhada({ match }) {
  const { setIsFetching, isFetching } = useContext(ReceitasContext);
  const [meal, setMeal] = useState([]);
  const { id } = match.params;

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
    <div className="detalhes-container">
      {isFetching
        ? <h2>Loading...</h2>
        : (
          <header className="detalhes-header">
            <img src={ meal.strMealThumb } alt="" />
          </header>
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
