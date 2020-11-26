import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';

function Perfil() {
  const { setDisabledSearchIcon,
    setTitleHeader, setShowSearchBar } = useContext(ReceitasContext);

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Perfil');
    setShowSearchBar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <section className="profile-container">
        <section className="profile-email">
          <h3 data-testid="profile-email" className="email">
            {JSON.parse(localStorage.getItem('user')).email}
          </h3>
        </section>
        <section className="profile-buttons">
          <Link to="/receitas-feitas">
            <button data-testid="profile-done-btn" type="button">Receitas Feitas</button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              data-testid="profile-favorite-btn"
              type="button"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link to="/">
            <button
              data-testid="profile-logout-btn"
              type="button"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </button>
          </Link>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default Perfil;
