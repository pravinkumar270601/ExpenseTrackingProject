/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const LOCATIONCREATE = createAsyncThunk(
  "LocationCreate/LocationCreate",
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

const LocationCreateSlice = createSlice({
  name: "LocationCreateSlice",
  initialState: {
    LocationCreate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LOCATIONCREATE.fulfilled, (state, action) => {
      state.LocationCreate = {
        ...state.LocationCreate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONCREATE.pending, (state, action) => {
      state.LocationCreate = {
        ...state.LocationCreate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONCREATE.rejected, (state, action) => {
      state.LocationCreate = {
        ...state.LocationCreate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const LocationCreateAction = {
    LOCATIONCREATE,
};

export { LocationCreateAction };
export default LocationCreateSlice.reducer;
