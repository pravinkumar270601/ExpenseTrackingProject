/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../constants";
import { fetchData } from "../../../helpers";

const EXPENSEUPDATE = createAsyncThunk(
  "ExpenseUpdate/ExpenseUpdate",
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

const ExpenseUpdateSlice = createSlice({
  name: "ExpenseUpdateSlice",
  initialState: {
    ExpenseUpdate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(EXPENSEUPDATE.fulfilled, (state, action) => {
      state.ExpenseUpdate = {
        ...state.ExpenseUpdate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(EXPENSEUPDATE.pending, (state, action) => {
      state.ExpenseUpdate = {
        ...state.ExpenseUpdate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(EXPENSEUPDATE.rejected, (state, action) => {
      state.ExpenseUpdate = {
        ...state.ExpenseUpdate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const ExpenseUpdateAction = {
    EXPENSEUPDATE,
};

export { ExpenseUpdateAction };
export default ExpenseUpdateSlice.reducer;