import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import fetchDrink from '../servicesAPI/drinkAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  const { setDisabledSearchIcon, setIsFetching, isFetching,
    setTitleHeader, setShowSearchBar,
  } = useContext(ReceitasContext);
  const [randomId, setRandomId] = useState('');

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar Bebidas');
    setShowSearchBar(false);
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = await fetchDrink('random', '');
      setRandomId(response[0].idDrink);
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
          to="/explorar/bebidas/ingredientes"
          className="explorar-bebidas-link"
        >
          Por Ingredientes
        </Link>
        {!isFetching
          ? (
            <Link
              data-testid="explore-surprise"
              to={ `/bebidas/${randomId}` }
              className="explorar-bebidas-link"
            >
              Me Surpreenda!
            </Link>)
          : null}
      </section>
      <Footer />
    </section>
  );
}

export default ExplorarBebidas;
