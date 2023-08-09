import { createSlice } from "@reduxjs/toolkit";
import commentsService from "../services/comment.service";

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
    }
  }
});
const { actions, reducer: commentsReducer } = commentsSlice;
const { recived, requested, requestFailed } = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await commentsService.getAll(userId);
    dispatch(recived(content));
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
