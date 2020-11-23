import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';

function Explorar() {
  const { setDisabledSearchIcon,
    setTitleHeader, setShowSearchBar,
  } = useContext(ReceitasContext);

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar');
    setShowSearchBar(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <Link data-testid="explore-food" to="/explorar/comidas">Explorar Comidas</Link>
      <Link data-testid="explore-drinks" to="/explorar/bebidas">Explorar Bebidas</Link>
    </div>
  );
}

export default Explorar;
