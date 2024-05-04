/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const MOVIESTABLEGETALL = createAsyncThunk(
  "MoviesTableGetAll/MoviesTableGetAll",
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

const MoviesTableGetAllSlice = createSlice({
  name: "MoviesTableGetAllSlice",
  initialState: {
    MoviesTableGetAll: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(MOVIESTABLEGETALL.fulfilled, (state, action) => {
      state.MoviesTableGetAll = {
        ...state.MoviesTableGetAll,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(MOVIESTABLEGETALL.pending, (state, action) => {
      state.MoviesTableGetAll = {
        ...state.MoviesTableGetAll,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(MOVIESTABLEGETALL.rejected, (state, action) => {
      state.MoviesTableGetAll = {
        ...state.MoviesTableGetAll,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const MoviesTableGetAllAction = {
    MOVIESTABLEGETALL,
};

export { MoviesTableGetAllAction };
export default MoviesTableGetAllSlice.reducer;
