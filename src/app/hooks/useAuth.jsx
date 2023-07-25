import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import localStorageService, {
  setTokens
} from "../services/localStorage.service";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      });
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        errorThrow(message);
      }
    }
  }

  async function logIn({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await getUserData();
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

  function LogOut() {
    localStorageService.removeAuthData();
    setUser(null);
    history.push("/");
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function updateUser(data) {
    try {
      const { content } = await userService.update(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  function errorCatcher(error) {
    console.log(error);
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
      // const errorObject = {
      //   email: "Некорректная электронная почта или пароль",
      //   password: "Некорректная электронная почта или пароль"
      // };
      // throw errorObject;
      throw new Error("Некорректная электронная почта или пароль");
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
      value={{
        signUp,
        logIn,
        isLoading,
        error,
        currentUser,
        LogOut,
        updateUser
      }}
    >
      {!isLoading ? children : "Загрузка..."}
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
