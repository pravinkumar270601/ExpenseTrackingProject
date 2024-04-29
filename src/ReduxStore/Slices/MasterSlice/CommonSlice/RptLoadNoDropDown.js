// /* eslint-disable no-sequences */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-param-reassign */
// /* eslint-disable no-unused-expressions */

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { defaultReject, defaultState } from "../../../constants";
// import { fetchData } from "../../helpers";

// const RPTLOADNODROPDOWN = createAsyncThunk(
//   "RptLoadNoDropDown/RptLoadNoDropDown",
//   // eslint-disable-next-line default-param-last
//   async (
//     // eslint-disable-next-line default-param-last
//     payload = {},
//     { rejectWithValue }
//   ) => {
//     try {
//       const data = await fetchData(
//         payload?.data,
//         payload?.method,
//         payload?.apiName
//       );
//       return {
//         ...defaultState.List,
//         message: data?.data.Message,
//         data: data?.data?.data,
//       };
//     } catch (error) {
//       return rejectWithValue({
//         ...defaultReject.List,
//         message: error.message,
//       });
//     }
//   }
// );

// const RptLoadNoDropDownSlice = createSlice({
//   name: "RptLoadNoDropDownSlice",
//   initialState: {
//     RptLoadNoDropDown: {
//       ...defaultState.List,
//       loading: false, 
//       error: false, 
//     },
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(RPTLOADNODROPDOWN.fulfilled, (state, action) => {
//       state.RptLoadNoDropDown = {
//         ...state.RptLoadNoDropDown,
//         loading: false,
//         error: false,
//         ...action.payload,
//       };
//     });
//     builder.addCase(RPTLOADNODROPDOWN.pending, (state, action) => {
//       state.RptLoadNoDropDown = {
//         ...state.RptLoadNoDropDown,
//         loading: true,
//         error: false,
//         ...action.payload,
//       };
//     });
//     builder.addCase(RPTLOADNODROPDOWN.rejected, (state, action) => {
//       state.RptLoadNoDropDown = {
//         ...state.RptLoadNoDropDown,
//         loading: false,
//         error: true,
//         ...action.payload,
//       };
//     });
//   },
// });

// const RptLoadNoDropDownAction = {
//     RPTLOADNODROPDOWN,
// };

// export { RptLoadNoDropDownAction };
// export default RptLoadNoDropDownSlice.reducer;
