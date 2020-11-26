import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import fetchDrink from '../servicesAPI/drinkAPI';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarBebidasIngredientes() {
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
      const response = await fetchDrink('listIngredient', '');
      setIngredientes(response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <section className="cards-list">
        {isFetching
          ? <h2>Loading...</h2>
          : ingredientes.map((drink, index) => (
            index < twelve ? <Card
              indexId={ index }
              key={ index }
              imagePath={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
              itemName={ drink.strIngredient1 }
              id=""
              itemType="bebidas"
              cardType="ingredient"
            />
              : null
          ))}
      </section>
      <Footer />
    </div>
  );
}

export default ExplorarBebidasIngredientes;
