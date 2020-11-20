import React from 'react';
import { Link } from 'react-router-dom';

function Explorar() {
  return (
    <div>
      <Link to="/comidas">Comidas</Link>
      <Link to="/bebidas">Bebidas</Link>
    </div>
  );
}

export default Explorar;
