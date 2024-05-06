/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CATEGORYUPDATE = createAsyncThunk(
  "CatagoryUpdate/CatagoryUpdate",
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

const CatagoryUpdateSlice = createSlice({
  name: "CatagoryUpdateSlice",
  initialState: {
    CatagoryUpdate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CATEGORYUPDATE.fulfilled, (state, action) => {
      state.CatagoryUpdate = {
        ...state.CatagoryUpdate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYUPDATE.pending, (state, action) => {
      state.CatagoryUpdate = {
        ...state.CatagoryUpdate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYUPDATE.rejected, (state, action) => {
      state.CatagoryUpdate = {
        ...state.CatagoryUpdate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CategoryUpdateAction = {
    CATEGORYUPDATE,
};

export { CategoryUpdateAction };
export default CatagoryUpdateSlice.reducer;