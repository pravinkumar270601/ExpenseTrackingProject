/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const SUBCATEGORYCREATE = createAsyncThunk(
  "SubCategoryCreate/SubCategoryCreate",
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

const SubCategoryCreateSlice = createSlice({
  name: "SubCategoryCreateSlice",
  initialState: {
    SubCategoryCreate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SUBCATEGORYCREATE.fulfilled, (state, action) => {
      state.SubCategoryCreate = {
        ...state.SubCategoryCreate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYCREATE.pending, (state, action) => {
      state.SubCategoryCreate = {
        ...state.SubCategoryCreate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYCREATE.rejected, (state, action) => {
      state.SubCategoryCreate = {
        ...state.SubCategoryCreate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const SubCategoryCreateAction = {
    SUBCATEGORYCREATE,
};

export { SubCategoryCreateAction };
export default SubCategoryCreateSlice.reducer;
