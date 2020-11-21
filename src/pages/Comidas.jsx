import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import Header from '../components/Header';
import Card from '../components/Card';

function Comidas() {
  const { recipes, setRecipes, setShowSearchBar, setTitleHeader,
    setDisabledSearchIcon } = useContext(ReceitasContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const requestAPI = async () => {
      const r = await fetchFood('ingredient', '');
      setRecipes(r);
      setIsFetching(false);
      setDisabledSearchIcon(false);
      setTitleHeader('Comidas');
      setShowSearchBar(false);
    };
    requestAPI();
  }, []);

  return (
    <main className="comidas-jsx-container">
      <header>
        <Header />
      </header>
      <section className="comidas-cards-list">
        {isFetching
          ? <h2>Loading...</h2>
          : recipes.map((meal, index) => (
            <Card
              key={ index }
              imagePath={ meal.strMealThumb }
              itemName={ meal.strMeal }
              id={ meal.idMeal }
              itemType="comida"
            />))}
      </section>
    </main>
  );
}

export default Comidas;
