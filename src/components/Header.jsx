import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import ReceitasContext from '../context/ReceitasContext';

function Header() {
  const { disabledSearchIcon, disabledProfileIcon,
    titleHeader } = useContext(ReceitasContext);

  const profileIcon = (
    <Link to="/perfil">
      <img data-testid="profile-top-btn" src={ profile } alt="" />
    </Link>
  );

  const searchIcon = (
    <Link to="/explorar">
      <img data-testid="search-top-btn" src={ search } alt="" />
    </Link>
  );

  const titleElement = (<p data-testid="page-title">{ titleHeader }</p>);

  return (
    <header className="header-container">
      { (disabledSearchIcon) ? '' : searchIcon }
      { (disabledProfileIcon) ? '' : profileIcon }
      { titleElement }
    </header>
  );
}

export default Header;
