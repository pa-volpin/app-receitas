import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import profile from '../images/profileIcon.svg';

function Explorar() {
  const { setDisabledSearchIcon,
    setTitleHeader, setShowSearchBar,
    recipes, setIsFetching, titleHeader,
  } = useContext(ReceitasContext);

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar Comidas');
    setShowSearchBar(true);
    setIsFetching(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

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
      <Link
        data-testid="explore-surprise"
        to="/explorar/comidas"
      >
        Me Surpreenda!
      </Link>
    </div>
  );
}

export default Explorar;
