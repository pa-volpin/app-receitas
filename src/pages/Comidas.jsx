import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
// import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

function Comidas() {
  const { recipes, setRecipes } = useContext(ReceitasContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const requestAPI = async () => {
      const r = await fetchFood('random', '');
      setRecipes(r);
      setIsFetching(false);
    };
    requestAPI();
  }, []);

  return (
    <main>
      <Header title="Comidas" />
      {/* <SearchBar /> */}
      {isFetching
        ? <h2>Loading...</h2>
        : recipes.map((meal, index) => (<p key={ index }>{ meal.strMeal }</p>))}
    </main>
  );
}

export default Comidas;
