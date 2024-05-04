

/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CATEGORYTABLEGETALL = createAsyncThunk(
  "CategoryTableGetAll/CategoryTableGetAll",
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

const CategoryTableGetAllSlice = createSlice({
  name: "CategoryTableGetAllSlice",
  initialState: {
    CategoryTableGetAll: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CATEGORYTABLEGETALL.fulfilled, (state, action) => {
      state.CategoryTableGetAll = {
        ...state.CategoryTableGetAll,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYTABLEGETALL.pending, (state, action) => {
      state.CategoryTableGetAll = {
        ...state.CategoryTableGetAll,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYTABLEGETALL.rejected, (state, action) => {
      state.CategoryTableGetAll = {
        ...state.CategoryTableGetAll,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CategoryTableGetAllAction = {
    CATEGORYTABLEGETALL,
};

export {CategoryTableGetAllAction };
export default CategoryTableGetAllSlice.reducer;
