import { createSlice } from "@reduxjs/toolkit";
import commentsService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
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
    create: (state, action) => {
      state.entities = [...state.entities, action.payload];
      state.isLoading = false;
    },
    remove: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
      state.isLoading = false;
    }
  }
});
const { actions, reducer: commentsReducer } = commentsSlice;
const { recived, requested, requestFailed, create, remove } = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await commentsService.getAll(userId);
    dispatch(recived(content));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};
export const createComment = (data) => async (dispatch) => {
  data = { ...data, _id: nanoid(), created_at: Date.now() };
  dispatch(requested());
  try {
    const { content } = await commentsService.create(data);
    dispatch(create(content));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};
export const removeComment = (id) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await commentsService.delete(id);
    if (content === null) dispatch(remove(id));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsIsLoading = () => (state) => state.comments.isLoading;
export const getCommentById = (id) => (state) => {
  if (state.comments.entities) {
    return state.comments.entities.find((p) => p._id === id);
  }
  return {};
};

export default commentsReducer;
