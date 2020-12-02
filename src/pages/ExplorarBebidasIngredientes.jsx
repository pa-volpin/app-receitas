import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import fetchDrink from '../servicesAPI/drinkAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarBebidasIngredientes() {
  const { setDisabledSearchIcon, setFilterIngredient,
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
    <main className="bebidas-container">
      <Header />
      <section className="bebidas-body">
        <section className="cards-list">
          {isFetching
            ? <h2>Loading...</h2>
            : ingredientes.map((drink, index) => (
              index < twelve
                ? (
                  <div
                    key={ index }
                    data-testid={ `${index}-ingredient-card` }
                  >
                    <div className="recomended-datails-ingredient">
                      <Link
                        className="recomended-details-link"
                        to="/bebidas"
                        onClick={ () => setFilterIngredient(drink.strIngredient1) }
                      >
                        <div className="recomended-img-body">
                          <img
                            data-testid={ `${index}-card-img` }
                            alt="recipe cover"
                            className="recomended-image"
                            src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                          />
                        </div>
                        <div
                          className="recomended-info"
                        >
                          <h4
                            data-testid={ `${index}-card-name` }
                            className="recomended-title"
                          >
                            {drink.strIngredient1}
                          </h4>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
                : null
            ))}
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default ExplorarBebidasIngredientes;
