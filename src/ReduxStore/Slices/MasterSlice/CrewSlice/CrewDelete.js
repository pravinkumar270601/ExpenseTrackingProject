/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CREWDELETE = createAsyncThunk(
  "CrewDelete/CrewDelete",
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

const CrewDeleteSlice = createSlice({
  name: "CrewDeleteSlice",
  initialState: {
    CrewDelete: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CREWDELETE.fulfilled, (state, action) => {
      state.CrewDelete = {
        ...state.CrewDelete,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWDELETE.pending, (state, action) => {
      state.CrewDelete = {
        ...state.CrewDelete,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWDELETE.rejected, (state, action) => {
      state.CrewDelete = {
        ...state.CrewDelete,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CrewDeleteAction = {
    CREWDELETE,
};

export { CrewDeleteAction };
export default CrewDeleteSlice.reducer;