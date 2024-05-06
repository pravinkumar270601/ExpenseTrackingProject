/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const LOCATIONDELETE = createAsyncThunk(
  "LocationDelete/LocationDelete",
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

const LocationDeleteSlice = createSlice({
  name: "LocationDeleteSlice",
  initialState: {
    LocationDelete: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LOCATIONDELETE.fulfilled, (state, action) => {
      state.LocationDelete = {
        ...state.LocationDelete,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONDELETE.pending, (state, action) => {
      state.LocationDelete = {
        ...state.LocationDelete,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONDELETE.rejected, (state, action) => {
      state.LocationDelete = {
        ...state.LocationDelete,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const LocationDeleteAction = {
    LOCATIONDELETE,
};

export { LocationDeleteAction };
export default LocationDeleteSlice.reducer;