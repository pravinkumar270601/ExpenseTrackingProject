/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const SUBCATEGORYGETBYID = createAsyncThunk(
  "SubCategoryGetById/SubCategoryGetById",
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

const SubCategoryGetByIdSlice = createSlice({
  name: "SubCategoryGetByIdSlice",
  initialState: {
    SubCategoryGetById: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SUBCATEGORYGETBYID.fulfilled, (state, action) => {
      state.SubCategoryGetById = {
        ...state.SubCategoryGetById,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYGETBYID.pending, (state, action) => {
      state.SubCategoryGetById = {
        ...state.SubCategoryGetById,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYGETBYID.rejected, (state, action) => {
      state.SubCategoryGetById = {
        ...state.SubCategoryGetById,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const SubCategoryGetByIdAction = {
    SUBCATEGORYGETBYID,
};

export { SubCategoryGetByIdAction };
export default SubCategoryGetByIdSlice.reducer;