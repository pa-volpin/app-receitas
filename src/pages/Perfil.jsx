import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';

function PagePerfil() {
  const { setDisabledSearchIcon, email,
    setTitleHeader, setShowSearchBar,
    isFetching, setIsFetching } = useContext(ReceitasContext);
  const [userEmail, setUserEmail] = useState({ email: 'email@mail.com' });

  useEffect(() => {
    setIsFetching(true);
    setUserEmail(JSON.parse(localStorage.getItem('user')));
    setDisabledSearchIcon(true);
    setTitleHeader('Perfil');
    setShowSearchBar(false);
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <section className="profile-container">
        <section className="profile-email">
          {isFetching
            ? <p>{email}</p>
            : (
              <h3 data-testid="profile-email" className="email">
                {userEmail.email}
              </h3>)}
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

export default PagePerfil;
