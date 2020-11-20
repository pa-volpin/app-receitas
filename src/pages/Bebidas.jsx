import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';

function Bebidas() {
  const { setTitleHeader } = useContext(ReceitasContext);
  useEffect(() => {
    setTitleHeader('Bebidas');
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Bebidas;
