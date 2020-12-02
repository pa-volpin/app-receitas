import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import fetchDrink from '../servicesAPI/drinkAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Categories from '../components/Categories';

function Bebidas({ history }) {
  const { recipesDrinks, setRecipesDrinks, setShowSearchBar,
    setTitleHeader, setDisabledSearchIcon,
    isFetching, setIsFetching, searchType,
    searchInput, filterDrink, filterIngredient } = useContext(ReceitasContext);
  const twelve = 12;

  useEffect(() => {
    setDisabledSearchIcon(false);
    setTitleHeader('Bebidas');
    setShowSearchBar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = (filterDrink === '' || filterDrink === 'All')
        ? await fetchDrink('itemName', '')
        : await fetchDrink('byCategory', filterDrink);
      setRecipesDrinks(response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDrink]);

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = (filterIngredient === '' || filterIngredient === 'All')
        ? await fetchDrink('itemName', '')
        : await fetchDrink('ingredient', filterIngredient);
      setRecipesDrinks(response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterIngredient]);

  return (
    <main className="bebidas-container">
      <header>
        <Header
          requestAPI={ async () => {
            const response = await fetchDrink(searchType, searchInput);
            if (response && response.length === 1) {
              history.push(`/bebidas/${response[0].idDrink}`);
            }
            if (response) {
              setRecipesDrinks(response);
            } else {
              // eslint-disable-next-line no-alert
              alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
            }
          } }
        />
      </header>
      <section className="bebidas-body">
        <section className="bebidas-filters">
          <Categories type="drinks" />
        </section>
        <section className="cards-list">
          {isFetching
            ? <h2>Loading...</h2>
            : recipesDrinks.map((Drink, index) => (
              index < twelve ? <Card
                indexId={ index }
                key={ index }
                imagePath={ Drink.strDrinkThumb }
                itemName={ Drink.strDrink }
                id={ Drink.idDrink }
                itemType="bebidas"
                cardType="recipe"
              />
                : null
            ))}
        </section>
      </section>
      <Footer />
    </main>
  );
}

Bebidas.propTypes = {
  history: propTypes.shape().isRequired,
};

export default Bebidas;
