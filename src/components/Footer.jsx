import React from 'react';
import drinkIncon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

const linkElement = (imgSrc, linkTestId, url) => (
  <a
    href={ url }
    data-testid={ linkTestId }
    src={ imgSrc }
    alt=""
    style={ { width: '40px', height: '40px' } }
  >
    <img src={ imgSrc } alt="" />
  </a>
);

const footerStyle = {
  backgroundColor: 'rgb(234,29,44)',
  bottom: '0px',
  position: 'fixed',
  textAlign: 'center',
  width: '100%',
};

function Footer() {
  return (
    <footer data-testid="footer" style={ footerStyle }>
      { linkElement(drinkIncon, 'drinks-bottom-btn', '/bebidas') }
      { linkElement(exploreIcon, 'explore-bottom-btn', '/explorar') }
      { linkElement(mealIcon, 'food-bottom-btn', '/comidas') }
    </footer>
  );
}

export default Footer;
