
/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const LOCATIONTABLEGETALL = createAsyncThunk(
  "LocationTableGetAll/LocationTableGetAll",
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

const LocationTableGetAllSlice = createSlice({
  name: "LocationTableGetAllSlice",
  initialState: {
    LocationTableGetAll: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LOCATIONTABLEGETALL.fulfilled, (state, action) => {
      state.LocationTableGetAll = {
        ...state.LocationTableGetAll,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONTABLEGETALL.pending, (state, action) => {
      state.LocationTableGetAll = {
        ...state.LocationTableGetAll,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOCATIONTABLEGETALL.rejected, (state, action) => {
      state.LocationTableGetAll = {
        ...state.LocationTableGetAll,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const LocationTableGetAllAction = {
    LOCATIONTABLEGETALL,
};

export { LocationTableGetAllAction };
export default LocationTableGetAllSlice.reducer;
