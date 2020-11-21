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
      const response = await fetchDrink('ingredient', '');
      setRecipes({ cockTails: response });
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
            const response = await fetchDrink(searchType, searchInput);
            setRecipes(response);
          } }
        />
      </header>
      <section className="cards-list">
        {isFetching
          ? <h2>Loading...</h2>
          : recipes.cockTails.map((drink, index) => (
            <Card
              key={ index }
              imagePath={ drink.strDrinkThumb }
              itemName={ drink.strDrink }
              id={ drink.idDrink }
              itemType="bebida"
            />))}
      </section>
    </main>
  );
}

export default Bebidas;
