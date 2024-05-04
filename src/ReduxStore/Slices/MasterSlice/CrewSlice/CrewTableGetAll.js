
/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CREWTABLEGETALL = createAsyncThunk(
  "CrewTableGetAll/CrewTableGetAll",
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

const CrewTableGetAllSlice = createSlice({
  name: "CrewTableGetAllSlice",
  initialState: {
    CrewTableGetAll: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CREWTABLEGETALL.fulfilled, (state, action) => {
      state.CrewTableGetAll = {
        ...state.CrewTableGetAll,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWTABLEGETALL.pending, (state, action) => {
      state.CrewTableGetAll = {
        ...state.CrewTableGetAll,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWTABLEGETALL.rejected, (state, action) => {
      state.CrewTableGetAll = {
        ...state.CrewTableGetAll,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CrewTableGetAllAction = {
    CREWTABLEGETALL,
};

export { CrewTableGetAllAction };
export default CrewTableGetAllSlice.reducer;
