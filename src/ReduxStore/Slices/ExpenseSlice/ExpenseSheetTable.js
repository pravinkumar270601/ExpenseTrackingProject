/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../constants";
import { fetchData } from "../../../helpers";

const EXPENSESHEETTABLE = createAsyncThunk(
  "ExpenseSheetTable/ExpenseSheetTable",
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

const ExpenseSheetTableSlice = createSlice({
  name: "ExpenseSheetTableSlice",
  initialState: {
    ExpenseSheetTable: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(EXPENSESHEETTABLE.fulfilled, (state, action) => {
      state.ExpenseSheetTable = {
        ...state.ExpenseSheetTable,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(EXPENSESHEETTABLE.pending, (state, action) => {
      state.ExpenseSheetTable = {
        ...state.ExpenseSheetTable,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(EXPENSESHEETTABLE.rejected, (state, action) => {
      state.ExpenseSheetTable = {
        ...state.ExpenseSheetTable,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const ExpenseSheetTableAction = {
    EXPENSESHEETTABLE,
};

export {ExpenseSheetTableAction };
export default ExpenseSheetTableSlice.reducer;