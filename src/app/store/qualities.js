import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastLoad: null
  },
  reducers: {
    requested: (state) => {
      state.isLoading = true;
    },
    recived: (state, action) => {
      state.entities = action.payload;
      state.lastLoad = Date.now();
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

function isOutDated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastLoad } = getState().qualities;
  if (isOutDated(lastLoad)) {
    dispatch(requested());
    try {
      const { content } = await qualityService.fetchAll();
      dispatch(recived(content));
    } catch (error) {
      dispatch(requestFailed(error));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesIsLoading = () => (state) => state.qualities.isLoading;
export const getQualitiesByIds = (ids) => (state) => {
  if (state.qualities.entities) {
    const qualitiesArray = [];
    for (const id of ids) {
      for (const quality of state.qualities.entities) {
        if (quality._id === id) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
    // state.qualities.entities.find((q) => q._id === id);
  }
  return [];
};

export default qualitiesReducer;
