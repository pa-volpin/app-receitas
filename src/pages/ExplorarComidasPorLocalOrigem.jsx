import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';

function ExplorarComidasPorLocalOrigem() {
  const { setTitleHeader } = useContext(ReceitasContext);
  useEffect(() => {
    setTitleHeader('Explorar Origem');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default ExplorarComidasPorLocalOrigem;
