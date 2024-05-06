/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CREWUPDATE = createAsyncThunk(
  "CrewUpdate/CrewUpdate",
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

const CrewUpdateSlice = createSlice({
  name: "CrewUpdateSlice",
  initialState: {
    CatagoryUpdate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CREWUPDATE.fulfilled, (state, action) => {
      state.CrewUpdate = {
        ...state.CrewUpdate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWUPDATE.pending, (state, action) => {
      state.CrewUpdate = {
        ...state.CrewUpdate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWUPDATE.rejected, (state, action) => {
      state.CrewUpdate = {
        ...state.CrewUpdate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CrewUpdateAction = {
    CREWUPDATE,
};

export { CrewUpdateAction };
export default CrewUpdateSlice.reducer;