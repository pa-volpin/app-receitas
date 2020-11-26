import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import fetchDrink from '../servicesAPI/drinkAPI';
import profile from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  const { setDisabledSearchIcon, setIsFetching, isFetching,
    setTitleHeader, setShowSearchBar, titleHeader,
  } = useContext(ReceitasContext);
  const [randomId, setRandomId] = useState('');

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar Bebidas');
    setShowSearchBar(true);
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
    <div>
      <h3 data-testid="page-title">{ titleHeader }</h3>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profile } alt="" />
      </Link>
      <Link
        data-testid="explore-by-ingredient"
        to="/explorar/bebidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      {!isFetching
        ? (
          <Link
            data-testid="explore-surprise"
            to={ `/bebidas/${randomId}` }
          >
            Me Surpreenda!
          </Link>)
        : null}
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
