/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const LOCATIONMOVIEDROPDOWN = createAsyncThunk(
  "LocationMovieDropDown/LocationMovieDropDown",
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

const LocationMovieDropDownSlice = createSlice({
  name: "LocationMovieDropDownSlice",
  initialState: {
    LocationMovieDropDown: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LOCATIONMOVIEDROPDOWN.fulfilled, (state, action) => {
      state.LocationMovieDropDown = {
        ...state.LocationMovieDropDown,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONMOVIEDROPDOWN.pending, (state, action) => {
      state.LocationMovieDropDown = {
        ...state.LocationMovieDropDown,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONMOVIEDROPDOWN.rejected, (state, action) => {
      state.LocationMovieDropDown = {
        ...state.LocationMovieDropDown,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const LocationMovieDropDownAction = {
  LOCATIONMOVIEDROPDOWN,
};

export { LocationMovieDropDownAction };
export default LocationMovieDropDownSlice.reducer;
