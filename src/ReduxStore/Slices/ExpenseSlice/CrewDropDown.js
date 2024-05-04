/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../constants";
import { fetchData } from "../../../helpers";

const CREWDROPDOWN = createAsyncThunk(
  "CrewDropDown/CrewDropDown",
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

const CrewDropDownSlice = createSlice({
  name: "CrewDropDown",
  initialState: {
    CrewDropDown: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CREWDROPDOWN.fulfilled, (state, action) => {
      state.CrewDropDown = {
        ...state.CrewDropDown,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWDROPDOWN.pending, (state, action) => {
      state.CrewDropDown = {
        ...state.CrewDropDown,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CREWDROPDOWN.rejected, (state, action) => {
      state.CrewDropDown = {
        ...state.CrewDropDown,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CrewDropDownAction = {
    CREWDROPDOWN,
};

export { CrewDropDownAction };
export default CrewDropDownSlice.reducer;
