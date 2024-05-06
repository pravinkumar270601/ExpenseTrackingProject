/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const LOCATIONUPDATE = createAsyncThunk(
  "LocationUpdate/LocationUpdate",
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

const LocationUpdateSlice = createSlice({
  name: "LocationUpdateSlice",
  initialState: {
    LocationUpdate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LOCATIONUPDATE.fulfilled, (state, action) => {
      state.LocationUpdate = {
        ...state.LocationUpdate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONUPDATE.pending, (state, action) => {
      state.LocationUpdate = {
        ...state.LocationUpdate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONUPDATE.rejected, (state, action) => {
      state.LocationUpdate = {
        ...state.LocationUpdate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const LocationUpdateAction = {
    LOCATIONUPDATE,
};

export { LocationUpdateAction };
export default LocationUpdateSlice.reducer;