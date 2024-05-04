/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CATEGORYCREATE = createAsyncThunk(
  "CategoryCreate/CategoryCreate",
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

const CategoryCreateSlice = createSlice({
  name: "CategoryCreateSlice",
  initialState: {
    CategoryCreate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CATEGORYCREATE.fulfilled, (state, action) => {
      state.CategoryCreate = {
        ...state.CategoryCreate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYCREATE.pending, (state, action) => {
      state.CategoryCreate = {
        ...state.CategoryCreate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYCREATE.rejected, (state, action) => {
      state.CategoryCreate = {
        ...state.CategoryCreate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CategoryCreateAction = {
    CATEGORYCREATE,
};

export { CategoryCreateAction };
export default CategoryCreateSlice.reducer;
