/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultReject, defaultState } from "../../../../constants";
import { fetchData } from "../../../helpers";


const LOACTIONGETBYID = createAsyncThunk(
  "LoactionGetById/LoactionGetById",
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

const LoactionGetByIdSlice = createSlice({
  name: "LoactionGetByIdSlice",
  initialState: {
    LoactionGetById: {
      ...defaultState.List,
      loading: false, 
      error: false, 
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LOACTIONGETBYID.fulfilled, (state, action) => {
      state.LoactionGetById = {
        ...state.LoactionGetById,
        loading: false,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOACTIONGETBYID.pending, (state, action) => {
      state.LoactionGetById = {
        ...state.LoactionGetById,
        loading: true,
        error: false,
        ...action.payload,
      };
    });
    builder.addCase(LOACTIONGETBYID.rejected, (state, action) => {
      state.LoactionGetById = {
        ...state.LoactionGetById,
        loading: false,
        error: true,
        ...action.payload,
      };
    });
  },
});

const LoactionGetByIdAction = {
    LOACTIONGETBYID,
};

export { LoactionGetByIdAction };
export default LoactionGetByIdSlice.reducer;
