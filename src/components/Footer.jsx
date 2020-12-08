import React from 'react';
import { Link } from 'react-router-dom';
import drinkIncon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

const linkElement = (imgSrc, linkTestId, url) => (
  <Link
    to={ url }
    data-testid={ linkTestId }
    src={ imgSrc }
    alt=""
    style={ { height: '50px', width: '50px' } }
    className="footer-icon"
  >
    <img src={ imgSrc } alt="" />
  </Link>
);

function Footer() {
  return (
    <footer data-testid="footer" className="footer-container">
      <section className="footer-icons">
        { linkElement(drinkIncon, 'drinks-bottom-btn', '/bebidas', 'bebidas') }
        { linkElement(exploreIcon, 'explore-bottom-btn', '/explorar', 'explore') }
        { linkElement(mealIcon, 'food-bottom-btn', '/comidas', 'comidas') }
      </section>
    </footer>
  );
}

export default Footer;
