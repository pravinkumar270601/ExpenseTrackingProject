/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CREWGETBYID = createAsyncThunk(
  "CrewGetById/CrewGetById",
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

const CrewGetByIdSlice = createSlice({
  name: "CrewGetByIdSlice",
  initialState: {
    CrewGetById: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CREWGETBYID.fulfilled, (state, action) => {
      state.CrewGetById = {
        ...state.CrewGetById,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWGETBYID.pending, (state, action) => {
      state.CrewGetById = {
        ...state.CrewGetById,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWGETBYID.rejected, (state, action) => {
      state.CrewGetById = {
        ...state.CrewGetById,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CrewGetByIdAction = {
    CREWGETBYID,
};

export { CrewGetByIdAction };
export default CrewGetByIdSlice.reducer;
