import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import profile from '../images/profileIcon.svg';
import SearchBar from '../components/SearchBar';

function Explorar() {
  const { setDisabledSearchIcon,
    setTitleHeader, setShowSearchBar,
    titleHeader,
  } = useContext(ReceitasContext);

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar');
    setShowSearchBar(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 data-testid="page-title">{ titleHeader }</h3>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profile } alt="" />
      </Link>
      <Link data-testid="explore-food" to="/explorar/comidas">Explorar Comidas</Link>
      <Link data-testid="explore-drinks" to="/explorar/bebidas">Explorar Bebidas</Link>
      <SearchBar />
    </div>
  );
}

export default Explorar;
