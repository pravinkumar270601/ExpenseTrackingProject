/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const MOVIEGetById = createAsyncThunk(
  "MovieGetById/MovieGetById",
  // eslint-disable-next-line default-param-last
  async (
    // eslint-disable-next-line default-param-last
    payload = {},
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchData(
        payload?.data,
        payload?.method,
        payload?.apiName
      );
      return {
        ...defaultState.List,
        message: data?.data.Message,
        data: data?.data?.data,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);

const MovieGetByIdSlice = createSlice({
  name: "MovieGetByIdSlice",
  initialState: {
    MovieGetById: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(MOVIEGetById.fulfilled, (state, action) => {
      state.MovieGetById = {
        ...state.MovieGetById,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(MOVIEGetById.pending, (state, action) => {
      state.MovieGetById = {
        ...state.MovieGetById,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(MOVIEGetById.rejected, (state, action) => {
      state.MovieGetById = {
        ...state.MovieGetById,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const MovieGetByIdAction = {
    MOVIEGetById,
};

export { MovieGetByIdAction };
export default MovieGetByIdSlice.reducer;
