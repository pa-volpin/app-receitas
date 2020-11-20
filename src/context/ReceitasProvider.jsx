import React, { useState } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [email, setEmail] = useState('');
  const [disabledProfileIcon, setDisabledProfileIcon] = useState(false);
  const [disabledSearchIcon, setDisabledSearchIcon] = useState(false);
  const [titleHeader, setTitleHeader] = useState('');

  const contextValue = {
    email,
    setEmail,
    disabledProfileIcon,
    setDisabledProfileIcon,
    disabledSearchIcon,
    setDisabledSearchIcon,
    titleHeader,
    setTitleHeader,
  };

  return (
    <ReceitasContext.Provider value={ contextValue }>
      {children}
    </ReceitasContext.Provider>
  );
}

ReceitasProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default ReceitasProvider;
