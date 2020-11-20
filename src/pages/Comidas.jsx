import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';

function Comidas() {
  const { setTitleHeader } = useContext(ReceitasContext);
  useEffect(() => {
    setTitleHeader('Comidas');
  }, []);

  return (
    <main>
      <Header />
    </main>
  );
}

export default Comidas;
