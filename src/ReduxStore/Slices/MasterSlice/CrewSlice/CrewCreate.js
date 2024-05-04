/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CREWCREATE = createAsyncThunk(
  "CrewCreate/CrewCreate",
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

const CrewCreateSlice = createSlice({
  name: "CrewCreateSlice",
  initialState: {
    CrewCreate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CREWCREATE.fulfilled, (state, action) => {
      state.CrewCreate = {
        ...state.CrewCreate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWCREATE.pending, (state, action) => {
      state.CrewCreate = {
        ...state.CrewCreate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWCREATE.rejected, (state, action) => {
      state.CrewCreate = {
        ...state.CrewCreate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CrewCreateAction = {
    CREWCREATE,
};

export { CrewCreateAction };
export default CrewCreateSlice.reducer;
