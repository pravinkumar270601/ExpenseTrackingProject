import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';



// import PrlLoadNoDropDownSlice from "../slices/AddNewParcel/PrlLoadNoDropDown";
// import PrlIdCardDropDownSlice from "../slices/AddNewParcel/PrlIdCardDropDown";


const reducer = combineReducers({

  // PrlLoadNoDropDown: PrlLoadNoDropDownSlice,
  // PrlIdCardDropDown:PrlIdCardDropDownSlice,

});

const store = configureStore({
	reducer,
});
export default store;
