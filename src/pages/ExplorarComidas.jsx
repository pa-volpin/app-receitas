import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';

function ExplorarComidas() {
  const { setDisabledSearchIcon, setTitleHeader } = useContext(ReceitasContext);
  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar Comidas');
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default ExplorarComidas;
