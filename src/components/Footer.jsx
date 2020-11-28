import React from 'react';
import drinkIncon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

const linkElement = (imgSrc, linkTestId, url, name) => (
  <a
    href={ url }
    data-testid={ linkTestId }
    src={ imgSrc }
    alt=""
    className="footer-icon"
  >
    {/* <span>{name}</span> */}
    <img src={ imgSrc } alt="" />
  </a>
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
