import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidasIngredientes() {
  const { setDisabledSearchIcon,
    setTitleHeader, setShowSearchBar,
    isFetching, setIsFetching } = useContext(ReceitasContext);
  const [ingredientes, setIngredientes] = useState([]);
  const twelve = 12;

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar Ingredientes');
    setShowSearchBar(false);
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = await fetchFood('listIngredient', '');
      setIngredientes(response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      {isFetching
        ? <h2>Loading...</h2>
        : ingredientes.map((meal, index) => (
          index < twelve ? <Card
            indexId={ index }
            key={ index }
            imagePath={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
            itemName={ meal.strIngredient }
            id=""
            itemType="comidas"
            cardType="ingredient"
          />
            : null
        ))}
      <Footer />
    </div>
  );
}

export default ExplorarComidasIngredientes;
