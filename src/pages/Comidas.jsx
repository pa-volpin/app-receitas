import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import foodAPI from '../servicesAPI/foodAPI';

function Comidas() {
  const [meals, setMeals] = useState([]);
  const [isFetching, setIsFetching] = useState('Loading...');

  useEffect(() => {
    const requestAPI = async () => {
      const r = await foodAPI('random', '');
      setMeals(r);
    };
    requestAPI();
  }, []);

  return (
    <main>
      <Header title="Comidas" />
      { meals.map((meal, index) => (<p key={ index }>{ meal.strMeal }</p>))}
    </main>
  );
}

export default Comidas;
