import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';

function PagePerfil() {
  const { setDisabledSearchIcon,
    setTitleHeader, setShowSearchBar,
    isFetching, setIsFetching } = useContext(ReceitasContext);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Perfil');
    setShowSearchBar(false);
    const localStorageEmail = localStorage.getItem('user');
    if (localStorageEmail) {
      const { email } = JSON.parse(localStorageEmail);
      setUserEmail(email);
    }
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <section className="profile-container">
        <section className="profile-email">
          {!isFetching && <h3 data-testid="profile-email">{userEmail}</h3>}
        </section>
        <section className="profile-buttons">
          <Link to="/receitas-favoritas">
            <button
              data-testid="profile-favorite-btn"
              type="button"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link to="/receitas-feitas">
            <button data-testid="profile-done-btn" type="button">Receitas Feitas</button>
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

export default PagePerfil;
