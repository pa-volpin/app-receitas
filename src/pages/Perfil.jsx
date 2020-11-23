import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';

function Perfil() {
  const { setDisabledSearchIcon, setTitleHeader } = useContext(ReceitasContext);
  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Perfil');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default Perfil;
