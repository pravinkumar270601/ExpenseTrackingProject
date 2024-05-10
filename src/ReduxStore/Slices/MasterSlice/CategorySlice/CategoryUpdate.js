/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CATEGORYUPDATE = createAsyncThunk(
  "CategoryUpdate/CategoryUpdate",
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

const CategoryUpdateSlice = createSlice({
  name: "CategoryUpdateSlice",
  initialState: {
    CategoryUpdate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CATEGORYUPDATE.fulfilled, (state, action) => {
      state.CategoryUpdate = {
        ...state.CategoryUpdate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYUPDATE.pending, (state, action) => {
      state.CategoryUpdate = {
        ...state.CategoryUpdate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYUPDATE.rejected, (state, action) => {
      state.CategoryUpdate = {
        ...state.CategoryUpdate,
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
export default CategoryUpdateSlice.reducer;