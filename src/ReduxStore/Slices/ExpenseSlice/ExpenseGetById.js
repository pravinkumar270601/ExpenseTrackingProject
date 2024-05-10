/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../constants";
import { fetchData } from "../../../helpers";

const EXPENSEGETBYID = createAsyncThunk(
  "ExpenseGetById/ExpenseGetById",
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

const ExpenseGetByIdSlice = createSlice({
  name: "ExpenseGetByIdSlice",
  initialState: {
    ExpenseGetById: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(EXPENSEGETBYID.fulfilled, (state, action) => {
      state.ExpenseGetById = {
        ...state.ExpenseGetById,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(EXPENSEGETBYID.pending, (state, action) => {
      state.ExpenseGetById = {
        ...state.ExpenseGetById,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(EXPENSEGETBYID.rejected, (state, action) => {
      state.ExpenseGetById = {
        ...state.ExpenseGetById,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const ExpenseGetByIdAction = {
    EXPENSEGETBYID,
};

export { ExpenseGetByIdAction };
export default ExpenseGetByIdSlice.reducer;