import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import profile from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function ExplorarComidas() {
  const { setDisabledSearchIcon, setIsFetching, isFetching,
    setTitleHeader, setShowSearchBar, titleHeader,
  } = useContext(ReceitasContext);
  const [randomId, setRandomId] = useState('');

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar Comidas');
    setShowSearchBar(true);
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
    <div>
      <h3 data-testid="page-title">{ titleHeader }</h3>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profile } alt="" />
      </Link>
      <Link
        data-testid="explore-by-ingredient"
        to="/explorar/comidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      <Link
        data-testid="explore-by-area"
        to="/explorar/comidas/area"
      >
        Por Local de Origem
      </Link>
      {!isFetching
        ? (
          <Link
            data-testid="explore-surprise"
            to={ `/comidas/${randomId}` }
          >
            Me Surpreenda!
          </Link>)
        : null}
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
