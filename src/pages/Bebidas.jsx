import React, { useContext, useEffect } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import fetchDrink from '../servicesAPI/drinkAPI';
import Header from '../components/Header';
import Card from '../components/Card';

function Bebidas() {
  const { recipes, setRecipes, setShowSearchBar,
    setTitleHeader, setDisabledSearchIcon,
    isFetching, setIsFetching, searchType,
    searchInput } = useContext(ReceitasContext);

  useEffect(() => {
    const firstRequestAPI = async () => {
      const r = await fetchDrink('ingredient', 'margarita');
      setRecipes({ cockTails: r });
      setIsFetching(false);
      setDisabledSearchIcon(false);
      setTitleHeader('Bebidas');
      setShowSearchBar(true);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="jsx-container">
      <header>
        <Header
          requestAPI={ async () => {
            const r = await fetchDrink(searchType, searchInput);
            setRecipes(r);
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

export default Bebidas;
