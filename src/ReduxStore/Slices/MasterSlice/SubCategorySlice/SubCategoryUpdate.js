/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";

const SUBCATEGORYUPDATE = createAsyncThunk(
  "SubCatagoryUpdate/SubCatagoryUpdate",
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

const SubCatagoryUpdateSlice = createSlice({
  name: "SubCatagoryUpdateSlice",
  initialState: {
    SubCatagoryUpdate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SUBCATEGORYUPDATE.fulfilled, (state, action) => {
      state.SubCatagoryUpdate = {
        ...state.SubCatagoryUpdate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYUPDATE.pending, (state, action) => {
      state.SubCatagoryUpdate = {
        ...state.SubCatagoryUpdate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(SUBCATEGORYUPDATE.rejected, (state, action) => {
      state.SubCatagoryUpdate = {
        ...state.SubCatagoryUpdate,
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
export default SubCatagoryUpdateSlice.reducer;