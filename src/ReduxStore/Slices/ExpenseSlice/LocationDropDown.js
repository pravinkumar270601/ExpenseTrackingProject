/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../constants";
import { fetchData } from "../../../helpers";

const LOCATIONDROPDOWN = createAsyncThunk(
  "LocationDropDown/LocationDropDown",
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

const LocationDropDownSlice = createSlice({
  name: "LocationDropDown",
  initialState: {
    LocationDropDown: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LOCATIONDROPDOWN.fulfilled, (state, action) => {
      state.LocationDropDown = {
        ...state.LocationDropDown,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONDROPDOWN.pending, (state, action) => {
      state.LocationDropDown = {
        ...state.LocationDropDown,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONDROPDOWN.rejected, (state, action) => {
      state.LocationDropDown = {
        ...state.LocationDropDown,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const LocationDropDownAction = {
    LOCATIONDROPDOWN,
};

export { LocationDropDownAction };
export default LocationDropDownSlice.reducer;
