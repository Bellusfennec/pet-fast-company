import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegistrForm from "../components/ui/registrForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === "registr" ? type : "login");
  const togleFormType = (params) => {
    setFormType((prevState) => (prevState === "registr" ? "login" : "registr"));
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4 shadow">
          {formType === "registr" ? (
            <>
              <h3 className="mb-4">Регистрация</h3>
              <RegistrForm />
              <p>
                Есть аккаунт?{" "}
                <a role="button" onClick={togleFormType}>
                  Войти
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Вход</h3>
              <LoginForm />
              <p>
                Нет аккаунта?{" "}
                <a role="button" onClick={togleFormType}>
                  Регистрация
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
