/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../constants";
import { fetchData } from "../../../helpers";

const EXPENSEDELETE = createAsyncThunk(
  "ExpenseDelete/ExpenseDelete",
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

const ExpenseDeleteSlice = createSlice({
  name: "ExpenseDeleteSlice",
  initialState: {
    ExpenseCreate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(EXPENSEDELETE.fulfilled, (state, action) => {
      state.ExpenseDelete = {
        ...state.ExpenseDelete,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(EXPENSEDELETE.pending, (state, action) => {
      state.ExpenseDelete = {
        ...state.ExpenseDelete,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(EXPENSEDELETE.rejected, (state, action) => {
      state.ExpenseDelete = {
        ...state.ExpenseDelete,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const ExpenseDeleteAction = {
    EXPENSEDELETE,
};

export { ExpenseDeleteAction };
export default ExpenseDeleteSlice.reducer;