import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: { entities: null, isLoading: true, error: null },
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
const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { recived, requested, requestFailed } = actions;

export const loadQualitiesList = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await qualityService.fetchAll();
    dispatch(recived(content));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesIsLoading = () => (state) => state.qualities.isLoading;

export default qualitiesReducer;
