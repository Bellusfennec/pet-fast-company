import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { httpAuth } from "../services/http.service";
import userService from "../services/user.service";
import { setTokens } from "../services/localStorage.service";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        errorThrow(message);
      }
    }
  }

  async function signIn({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        errorThrow(message);
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  function errorThrow(message) {
    if (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD") {
      const errorObject = {
        email: "Некорректная электронная почта или пароль",
        password: "Некорректная электронная почта или пароль"
      };
      throw errorObject;
    }
    if (message === "EMAIL_EXISTS") {
      const errorObject = {
        email: "Пользователь с такой электронной почтой уже существует"
      };
      throw errorObject;
    }
    if (
      message === "WEAK_PASSWORD : Password should be at least 6 characters"
    ) {
      const errorObject = {
        password: "Минимальная длинна 6 символов"
      };
      throw errorObject;
    }
    if (message === "INVALID_EMAIL") {
      const errorObject = {
        email: "Проверьте корректность электронной почты"
      };
      throw errorObject;
    }
  }

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, isLoading, error, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
