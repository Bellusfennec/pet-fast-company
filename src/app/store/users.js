/* eslint-disable indent */
import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    requested: (state) => {
      state.isLoading = true;
    },
    recived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    requestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdated: (state, action) => {
      const elementIndex = state.entities.findIndex(
        (el) => el._id === action.payload._id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload
      };
    }
  }
});
const { actions, reducer: usersReducer } = usersSlice;
const {
  recived,
  requested,
  requestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdated
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const login = (params) => async (dispatch) => {
  const { payload, redirect } = params;
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const content = await authService.login({ email, password });
    localStorageService.setTokens(content);
    dispatch(authRequestSuccess({ userId: content.localId }));
    history.push(redirect);
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};
export const signUp = (payload) => async (dispatch) => {
  const { email, password, ...rest } = payload;
  dispatch(authRequested());
  try {
    const content = await authService.registration({ email, password });
    localStorageService.setTokens(content);
    dispatch(authRequestSuccess({ userId: content.localId }));
    dispatch(
      createUser({
        _id: content.localId,
        email,
        rate: getRandomInt(1, 5),
        completedMeetings: getRandomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      })
    );
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};
export const logOut = (payload) => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};
function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
      history.push("/users");
    } catch (error) {
      dispatch(userCreateFailed(error.message));
    }
  };
}
export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userUpdated(content));
    history.push(`/users/${payload._id}`);
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};
export const loadUsersList = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await userService.getAll();
    dispatch(recived(content));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getUsersLoaded = () => (state) => state.users.dataLoaded;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsers = () => (state) => state.users.entities;
export const getUsersIsLoading = () => (state) => state.users.isLoading;
export const getUserById = (id) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === id);
  }
};

export default usersReducer;
