import React, { useState, useEffect, useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';

function Login() {
  const { email, setEmail } = useContext(ReceitasContext);
  const [enable, setEnable] = useState(false);
  const [pass, setPass] = useState('');

  function handleChange() {
    const six = /.{6,}/;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    setEnable(reg.test(email) && six.test(pass));
  }

  useEffect(() => {
    handleChange();
  }, [email, pass]);

  return (
    <section className="login-container">
      <input
        data-testid="email-input"
        type="email"
        placeholder="Email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <input
        data-testid="password-input"
        type="password"
        placeholder="Passowrd"
        onChange={({ target }) => setPass(target.value)}
      />
      <button
        onClick={() => {}}
        data-testid="login-submit-btn"
        type="button"
        className="login-btn"
        disabled={!enable}
      >
        Entrar
      </button>
    </section>
  );
}

export default Login;
