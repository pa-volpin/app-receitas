import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidas() {
  const { setDisabledSearchIcon, setIsFetching, isFetching,
    setTitleHeader, setShowSearchBar,
  } = useContext(ReceitasContext);
  const [randomId, setRandomId] = useState('');

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar Comidas');
    setShowSearchBar(false);
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = await fetchFood('random', '');
      setRandomId(response[0].idMeal);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="explorar-container">
      <Header />
      <section className="explorar-body">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
          className="explorar-comidas-link"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
          className="explorar-comidas-link"
        >
          Por Local de Origem
        </Link>
        {!isFetching
          ? (
            <Link
              data-testid="explore-surprise"
              to={ `/comidas/${randomId}` }
              className="explorar-comidas-link"
            >
              Me Surpreenda!
            </Link>)
          : null}
      </section>
      <Footer />
    </section>
  );
}

export default ExplorarComidas;
