import React from "react";

const Login = () => {
  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input type="text" id="password" />
      </div>
    </form>
  );
};

export default Login;
