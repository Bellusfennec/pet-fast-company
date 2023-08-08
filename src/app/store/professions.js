import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
  name: "professions",
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
const { actions, reducer: professionsReducer } = professionsSlice;
const { recived, requested, requestFailed } = actions;

function isOutDated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastLoad } = getState().professions;
  if (isOutDated(lastLoad)) {
    dispatch(requested());
    try {
      const { content } = await professionService.getAll();
      dispatch(recived(content));
    } catch (error) {
      dispatch(requestFailed(error));
    }
  }
};
export const getProfessionsByIds2 = (ids) => (dispatch, getState) => {
  const { entities } = getState().professions;
  if (entities) {
    const professionsArray = [];
    for (const id of ids) {
      for (const profession of entities) {
        if (profession._id === id) {
          professionsArray.push(profession);
          break;
        }
      }
    }
    return professionsArray;
    // state.professions.entities.find((q) => q._id === id);
  }
  return [];
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsIsLoading = () => (state) =>
  state.professions.isLoading;
export const getProfessionById = (id) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((q) => q._id === id);
  }
  return {};
};

export default professionsReducer;
