/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../constants";
import { fetchData } from "../../../helpers";

const CATEGORYDROPDOWN = createAsyncThunk(
  "CategoryDropDown/CategoryDropDown",
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

const CategoryDropDownSlice = createSlice({
  name: "CategoryDropDown",
  initialState: {
    CategoryDropDown: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CATEGORYDROPDOWN.fulfilled, (state, action) => {
      state.CategoryDropDown = {
        ...state.CategoryDropDown,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYDROPDOWN.pending, (state, action) => {
      state.CategoryDropDown = {
        ...state.CategoryDropDown,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(CATEGORYDROPDOWN.rejected, (state, action) => {
      state.CategoryDropDown = {
        ...state.CategoryDropDown,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const CategoryDropDownAction = {
    CATEGORYDROPDOWN,
};

export { CategoryDropDownAction };
export default CategoryDropDownSlice.reducer;
