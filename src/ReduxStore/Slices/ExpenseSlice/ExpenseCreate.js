/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../constants";
import { fetchData } from "../../../helpers";

const EXPENSECREATE = createAsyncThunk(
  "ExpenseCreate/ExpenseCreate",
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

const ExpenseCreateSlice = createSlice({
  name: "ExpenseCreateSlice",
  initialState: {
    ExpenseCreate: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(EXPENSECREATE.fulfilled, (state, action) => {
      state.ExpenseCreate = {
        ...state.ExpenseCreate,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(EXPENSECREATE.pending, (state, action) => {
      state.ExpenseCreate = {
        ...state.ExpenseCreate,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(EXPENSECREATE.rejected, (state, action) => {
      state.ExpenseCreate = {
        ...state.ExpenseCreate,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const ExpenseCreateAction = {
    EXPENSECREATE,
};

export { ExpenseCreateAction };
export default ExpenseCreateSlice.reducer;
