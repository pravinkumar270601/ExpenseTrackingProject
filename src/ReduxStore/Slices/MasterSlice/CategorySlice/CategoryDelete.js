/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CATEGORYDELETE = createAsyncThunk(
  "CategoryDelete/CategoryDelete",
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

const CategoryDeleteSlice = createSlice({
  name: "CategoryDeleteSlice",
  initialState: {
    CategoryDelete: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CATEGORYDELETE.fulfilled, (state, action) => {
      state.CategoryDelete = {
        ...state.CategoryDelete,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYDELETE.pending, (state, action) => {
      state.CategoryDelete = {
        ...state.CategoryDelete,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYDELETE.rejected, (state, action) => {
      state.CategoryDelete = {
        ...state.CategoryDelete,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CategoryDeleteAction = {
    CATEGORYDELETE,
};

export { CategoryDeleteAction };
export default CategoryDeleteSlice.reducer;