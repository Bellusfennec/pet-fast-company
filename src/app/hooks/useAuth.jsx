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
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: " Пользователь с таким Email уже существует"
          };
          throw errorObject;
        }
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
        if (message === "INVALID_PASSWORD") {
          const errorObject = {
            password: "Проверьте пароль"
          };
          throw errorObject;
        }
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = {
            email: "Проверьте email"
          };
          throw errorObject;
        }
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
