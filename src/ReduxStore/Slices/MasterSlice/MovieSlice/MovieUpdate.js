/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const MOVIEUPDATE = createAsyncThunk(
  "MovieUpdate/MovieUpdate",
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

const MovieUpdateSlice = createSlice({
  name: "MovieUpdateSlice",
  initialState: {
    MovieUpdate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(MOVIEUPDATE.fulfilled, (state, action) => {
      state.MovieUpdate = {
        ...state.MovieUpdate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(MOVIEUPDATE.pending, (state, action) => {
      state.MovieUpdate = {
        ...state.MovieUpdate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(MOVIEUPDATE.rejected, (state, action) => {
      state.MovieUpdate = {
        ...state.MovieUpdate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const MovieUpdateAction = {
    MOVIEUPDATE,
};

export { MovieUpdateAction };
export default MovieUpdateSlice.reducer;