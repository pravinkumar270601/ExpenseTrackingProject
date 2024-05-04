/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const MOVIEDELETE = createAsyncThunk(
  "MovieDelete/MovieDelete",
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

const MovieDeleteSlice = createSlice({
  name: "MovieDeleteSlice",
  initialState: {
    MovieDelete: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(MOVIEDELETE.fulfilled, (state, action) => {
      state.MovieDelete = {
        ...state.MovieDelete,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(MOVIEDELETE.pending, (state, action) => {
      state.MovieDelete = {
        ...state.MovieDelete,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(MOVIEDELETE.rejected, (state, action) => {
      state.MovieDelete = {
        ...state.MovieDelete,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const MovieDeleteAction = {
    MOVIEDELETE,
};

export { MovieDeleteAction };
export default MovieDeleteSlice.reducer;