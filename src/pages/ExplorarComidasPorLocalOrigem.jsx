import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';

function ExplorarComidasPorLocalOrigem() {
  const { setTitleHeader, setDisabledSearchIcon, setShowSearchBar } = useContext(ReceitasContext);
  useEffect(() => {
    setDisabledSearchIcon(false);
    setTitleHeader('Explorar Origem');
    setShowSearchBar(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default ExplorarComidasPorLocalOrigem;
