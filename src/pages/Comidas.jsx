import React, { useContext, useEffect } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import Header from '../components/Header';
import Card from '../components/Card';

function Comidas() {
  const { recipes, setRecipes, setShowSearchBar,
    setTitleHeader, setDisabledSearchIcon,
    isFetching, setIsFetching } = useContext(ReceitasContext);

  useEffect(() => {
    const firstRequestAPI = async () => {
      const response = await fetchFood('ingredient', '');
      setRecipes({ meals: response });
      setIsFetching(false);
      setDisabledSearchIcon(false);
      setTitleHeader('Comidas');
      setShowSearchBar(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="jsx-container">
      <header>
        <Header />
      </header>
      <section className="cards-list">
        {isFetching
          ? <h2>Loading...</h2>
          : recipes.meals.map((meal, index) => (
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
