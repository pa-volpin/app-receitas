import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import ReceitasContext from '../context/ReceitasContext';
import SearchBar from './SearchBar';

function Header({ requestAPI }) {
  const { disabledSearchIcon, disabledProfileIcon,
    titleHeader, showSearchBar } = useContext(ReceitasContext);

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

  const titleElement = (<h3 data-testid="page-title">{ titleHeader }</h3>);

  return (
    <header className="header-container">
      <div className="header-icons">
        { (disabledSearchIcon) ? '' : searchIcon }
        { titleElement }
        { (disabledProfileIcon) ? '' : profileIcon }
      </div>
      {showSearchBar && (
        <div className="searchBar-header">
          <SearchBar requestAPI={ requestAPI } />
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  requestAPI: propTypes.func.isRequired,
};

export default Header;
