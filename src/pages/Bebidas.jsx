import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import fetchDrink from '../servicesAPI/drinkAPI';
import Header from '../components/Header';
import Card from '../components/Card';

function Bebidas({ history }) {
  const { recipes, setRecipes, setShowSearchBar,
    setTitleHeader, setDisabledSearchIcon,
    isFetching, setIsFetching, searchType,
    searchInput } = useContext(ReceitasContext);

  useEffect(() => {
    setIsFetching(true);
    setDisabledSearchIcon(false);
    setTitleHeader('Bebidas');
    setShowSearchBar(false);
    const firstRequestAPI = async () => {
      const response = await fetchDrink('ingredient', 'Gin');
      setRecipes({ cockTails: response });
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
            const response = await fetchDrink(searchType, searchInput);
            if (response && response.length === 1) {
              history.push(`/bebidas/${response[0].idDrink}`);
            }
            if (response) {
              setRecipes({ cockTails: response });
            }
          } }
        />
      </header>
      <section className="cards-list">
        {isFetching
          ? <h2>Loading...</h2>
          : recipes.cockTails.map((Drink, index) => (
            <Card
              key={ index }
              imagePath={ Drink.strDrinkThumb }
              itemName={ Drink.strDrink }
              id={ Drink.idDrink }
              itemType="bebidas"
            />))}
      </section>
    </main>
  );
}

Bebidas.propTypes = {
  history: propTypes.shape().isRequired,
};

export default Bebidas;
