import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import Header from '../components/Header';
import Card from '../components/Card';

function Comidas({ history }) {
  const { recipes, setRecipes, setShowSearchBar,
    setTitleHeader, setDisabledSearchIcon,
    isFetching, setIsFetching, searchType,
    searchInput } = useContext(ReceitasContext);
  const twelve = 12;

  useEffect(() => {
    setIsFetching(true);
    setDisabledSearchIcon(false);
    setTitleHeader('Comidas');
    setShowSearchBar(false);
    const firstRequestAPI = async () => {
      const response = await fetchFood('itemName', '');
      setRecipes({ meals: response });
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="jsx-container">
      <header>
        <Header
          requestAPI={ async () => {
            const response = await fetchFood(searchType, searchInput);
            if (response && response.length === 1) {
              history.push(`/comidas/${response[0].idMeal}`);
            }
            if (response) {
              setRecipes({ meals: response });
            }
            // eslint-disable-next-line no-alert
            alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
          } }
        />
      </header>
      <section className="cards-list">
        {isFetching
          ? <h2>Loading...</h2>
          : recipes.meals.map((meal, index) => (
            index < twelve ? <Card
              indexId={ index }
              key={ index }
              imagePath={ meal.strMealThumb }
              itemName={ meal.strMeal }
              id={ meal.idMeal }
              itemType="comidas"
            />
              : null
          ))}
      </section>
    </main>
  );
}

Comidas.propTypes = {
  history: propTypes.shape().isRequired,
};

export default Comidas;
