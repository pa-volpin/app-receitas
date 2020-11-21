import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import Header from '../components/Header';

function Comidas() {
  const { recipes, setRecipes, setShowSearchBar, setTitleHeader,
    setDisabledSearchIcon } = useContext(ReceitasContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const requestAPI = async () => {
      const r = await fetchFood('random', '');
      setRecipes(r);
      setIsFetching(false);
      setDisabledSearchIcon(false);
      setTitleHeader('Comidas');
      setShowSearchBar(false);
    };
    requestAPI();
  }, []);

  return (
    <main>
      <Header />
      {isFetching
        ? <h2>Loading...</h2>
        : recipes.map((meal, index) => (<p key={ index }>{ meal.strMeal }</p>))}
    </main>
  );
}

export default Comidas;
