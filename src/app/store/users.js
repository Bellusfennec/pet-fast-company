/* eslint-disable indent */
import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false
  },
  reducers: {
    requested: (state) => {
      state.isLoading = true;
    },
    recived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    requestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload, isLoggedIn: true };
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    }
  }
});
const { actions, reducer: usersReducer } = usersSlice;
const {
  recived,
  requested,
  requestFailed,
  authRequestSuccess,
  authRequestFailed
} = actions;

const authRequested = createAction("users/authRequested");

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const content = await authService.registration({ email, password });
      localStorageService.setTokens(content);
      dispatch(authRequestSuccess({ userId: content.localId }));
    } catch (error) {
      dispatch(authRequestFailed(error.message));
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
export const getUsers = () => (state) => state.users.entities;
export const getUsersIsLoading = () => (state) => state.users.isLoading;
export const getUserById = (id) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === id);
  }
};

export default usersReducer;
