/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const CATEGORYGETBYID = createAsyncThunk(
  "CategoryGetById/CategoryGetById",
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

const CategoryGetByIdSlice = createSlice({
  name: "CategoryGetByIdSlice",
  initialState: {
    CategoryGetById: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CATEGORYGETBYID.fulfilled, (state, action) => {
      state.CategoryGetById = {
        ...state.CategoryGetById,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYGETBYID.pending, (state, action) => {
      state.CategoryGetById = {
        ...state.CategoryGetById,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYGETBYID.rejected, (state, action) => {
      state.CategoryGetById = {
        ...state.CategoryGetById,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CategoryGetByIdAction = {
    CATEGORYGETBYID,
};

export { CategoryGetByIdAction };
export default CategoryGetByIdSlice.reducer;