/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const SUBCATEGORYDELETE = createAsyncThunk(
  "SubCategoryDelete/SubCategoryDelete",
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

const SubCategoryDeleteSlice = createSlice({
  name: "SubCategoryDeleteSlice",
  initialState: {
    SubCategoryDelete: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SUBCATEGORYDELETE.fulfilled, (state, action) => {
      state.SubCategoryDelete = {
        ...state.SubCategoryDelete,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYDELETE.pending, (state, action) => {
      state.SubCategoryDelete = {
        ...state.SubCategoryDelete,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYDELETE.rejected, (state, action) => {
      state.SubCategoryDelete = {
        ...state.SubCategoryDelete,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const SubCategoryDeleteAction = {
    SUBCATEGORYDELETE,
};

export { SubCategoryDeleteAction };
export default SubCategoryDeleteSlice.reducer;