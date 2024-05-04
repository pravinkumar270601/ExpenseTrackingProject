/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const  SUBCATEGORYTABLE = createAsyncThunk(
  "SubCategoryTable/SubCategoryTable",
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

const SubCategoryTableSlice = createSlice({
  name: "SubCategoryTableSlice",
  initialState: {
    SubCategoryTable: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SUBCATEGORYTABLE.fulfilled, (state, action) => {
      state.SubCategoryTable = {
        ...state.SubCategoryTable,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYTABLE.pending, (state, action) => {
      state.SubCategoryTable = {
        ...state.SubCategoryTable,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYTABLE.rejected, (state, action) => {
      state.MoviesTableGetAll = {
        ...state.MoviesTableGetAll,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const SubCategoryTableAction = {
    SUBCATEGORYTABLE,
};

export {SubCategoryTableAction };
export default SubCategoryTableSlice.reducer;
