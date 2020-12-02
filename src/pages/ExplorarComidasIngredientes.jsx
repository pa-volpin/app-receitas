import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidasIngredientes() {
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
      const response = await fetchFood('listIngredient', '');
      setIngredientes(response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="comidas-container">
      <Header />
      <section className="comidas-body">
        <section className="cards-list">
          {isFetching
            ? <h2>Loading...</h2>
            : ingredientes.map((meal, index) => (
              index < twelve
                ? (
                  <div
                    key={ index }
                    data-testid={ `${index}-ingredient-card` }
                  >
                    <div className="recomended-datails-ingredient">
                      <Link
                        className="recomended-details-link"
                        to="/comidas"
                        onClick={ () => setFilterIngredient(meal.strIngredient) }
                      >
                        <div className="recomended-img-body">
                          <img
                            data-testid={ `${index}-card-img` }
                            alt="recipe cover"
                            className="recomended-image"
                            src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
                          />
                        </div>
                        <div
                          className="recomended-info"
                        >
                          <h4
                            data-testid={ `${index}-card-name` }
                            className="recomended-title"
                          >
                            {meal.strIngredient}
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

export default ExplorarComidasIngredientes;
