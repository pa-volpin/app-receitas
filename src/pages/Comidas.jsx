import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Categories from '../components/Categories';

function Comidas({ history }) {
  const { recipesMeals, setRecipesMeals, setShowSearchBar,
    setTitleHeader, setDisabledSearchIcon,
    isFetching, setIsFetching, searchType,
    searchInput, filterFood } = useContext(ReceitasContext);
  const twelve = 12;

  useEffect(() => {
    setDisabledSearchIcon(false);
    setTitleHeader('Comidas');
    setShowSearchBar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = (filterFood === '' || filterFood === 'All')
        ? await fetchFood('itemName', '')
        : await fetchFood('byCategory', filterFood);
      setRecipesMeals(response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterFood]);

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
              setRecipesMeals(response);
            }
            // eslint-disable-next-line no-alert
            alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
          } }
        />
      </header>
      <section>
        <Categories type="meals" />
      </section>
      <section className="cards-list">
        {isFetching
          ? <h2>Loading...</h2>
          : recipesMeals.map((meal, index) => (
            index < twelve ? <Card
              indexId={ index }
              key={ index }
              imagePath={ meal.strMealThumb }
              itemName={ meal.strMeal }
              id={ meal.idMeal }
              itemType="comidas"
              cardType="recipe"
            />
              : null
          ))}
      </section>
      <Footer />
    </main>
  );
}

Comidas.propTypes = {
  history: propTypes.shape().isRequired,
};

export default Comidas;
