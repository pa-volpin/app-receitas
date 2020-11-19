import React from 'react';

function Login() {
  return (
    <section className="login-container">
      <input data-testid="email-input" type="email" placeholder="Email" />
      <input data-testid="password-input" type="password" placeholder="Passowrd" />
      <button data-testid="login-submit-btn" type="button" className="login-btn">
        Entrar
      </button>
    </section>
  );
}

export default Login;
