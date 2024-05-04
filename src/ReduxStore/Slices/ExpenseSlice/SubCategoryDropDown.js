
/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../constants";
import { fetchData } from "../../../helpers";

const SUBCATEGORYDROPDOWN = createAsyncThunk(
  "SubCategoryDropDown/SubCategoryDropDown",
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

const SubCategoryDropDownSlice = createSlice({
  name: "SubCategoryDropDown",
  initialState: {
    SubCategoryDropDown: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SUBCATEGORYDROPDOWN.fulfilled, (state, action) => {
      state.SubCategoryDropDown = {
        ...state.SubCategoryDropDown,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYDROPDOWN.pending, (state, action) => {
      state.SubCategoryDropDown = {
        ...state.SubCategoryDropDown,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYDROPDOWN.rejected, (state, action) => {
      state.SubCategoryDropDown = {
        ...state.SubCategoryDropDown,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const SubCategoryDropDownAction = {
    SUBCATEGORYDROPDOWN,
};

export { SubCategoryDropDownAction };
export default SubCategoryDropDownSlice.reducer;
