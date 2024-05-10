/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const SUBCATEGORYUPDATE = createAsyncThunk(
  "SubCategoryUpdate/SubCategoryUpdate",
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

const SubCategoryUpdateSlice = createSlice({
  name: "SubCategoryUpdateSlice",
  initialState: {
    SubCategoryUpdate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SUBCATEGORYUPDATE.fulfilled, (state, action) => {
      state.SubCategoryUpdate = {
        ...state.SubCategoryUpdate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYUPDATE.pending, (state, action) => {
      state.SubCategoryUpdate = {
        ...state.SubCategoryUpdate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYUPDATE.rejected, (state, action) => {
      state.SubCategoryUpdate = {
        ...state.SubCategoryUpdate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const SubCategoryUpdateAction = {
    SUBCATEGORYUPDATE,
};

export { SubCategoryUpdateAction };
export default SubCategoryUpdateSlice.reducer;