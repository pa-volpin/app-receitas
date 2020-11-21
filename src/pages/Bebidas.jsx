import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import fetchDrink from '../servicesAPI/drinkAPI';
import Header from '../components/Header';

function Bebidas() {
  const { recipes, setRecipes } = useContext(ReceitasContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const requestAPI = async () => {
      const r = await fetchDrink('random', '');
      setRecipes(r);
      setIsFetching(false);
    };
    requestAPI();
  }, []);

  return (
    <main>
      <Header title="Bebidas" />
      {isFetching
        ? <h2>Loading...</h2>
        : recipes.map((drink, index) => (<p key={ index }>{ drink.strDrink }</p>))}
    </main>
  );
}

export default Bebidas;
