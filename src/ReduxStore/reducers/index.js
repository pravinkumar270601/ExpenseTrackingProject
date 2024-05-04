import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import LocationMovieDropDownSlice  from "../Slices/MasterSlice/LocationSlice/LocationMovieDropDown"
import MoviesTableGetAllSlice from '../Slices/MasterSlice/MovieSlice/MoviesTableGetAll';
import LocationTableGetAllSlice from '../Slices/MasterSlice/LocationSlice/LocationTableGetAll';
import CategoryTableGetAllSlice from '../Slices/MasterSlice/CategorySlice/CategoryTableGetAll';
import SubCategoryTableSlice from '../Slices/MasterSlice/SubCategorySlice/SubCategoryTable';
import CrewTableGetAllSlice from '../Slices/MasterSlice/CrewSlice/CrewTableGetAll';
import ExpenseSheetTableSlice from '../Slices/ExpenseSlice/ExpenseSheetTable';
import CategoryDropDownSlice from '../Slices/ExpenseSlice/CategoryDropDown';
import SubCategoryDropDownSlice from '../Slices/ExpenseSlice/SubCategoryDropDown';
import LocationDropDownSlice from '../Slices/ExpenseSlice/LocationDropDown';
import CrewDropDownSlice from '../Slices/ExpenseSlice/CrewDropDown';
import LocationCreateSlice from '../Slices/MasterSlice/LocationSlice/LocationCreate';
import CategoryCreateSlice from '../Slices/MasterSlice/CategorySlice/CategoryCreate';
import  CrewCreateSlice from '../Slices/MasterSlice/CrewSlice/CrewCreate';
import  SubCategoryCreateSlice from '../Slices/MasterSlice/SubCategorySlice/SubCategoryCreate';
import  ExpenseCreateSlice from '../Slices/ExpenseSlice/ExpenseCreate';
import  MovieCreateSlice from '../Slices/MasterSlice/MovieSlice/MovieCreate';


const reducer = combineReducers({


  LocationMovieDropDown:LocationMovieDropDownSlice,
  MoviesTableGetAll:MoviesTableGetAllSlice,
  LocationTableGetAll:LocationTableGetAllSlice,
  CategoryTableGetAll:CategoryTableGetAllSlice,
  SubCategoryTable:SubCategoryTableSlice,
  CrewTableGetAll:CrewTableGetAllSlice,
  ExpenseSheetTable:ExpenseSheetTableSlice,
  CategoryDropDown: CategoryDropDownSlice,
  SubCategoryDropDown:SubCategoryDropDownSlice,
  LocationDropDown:LocationDropDownSlice,
  CrewDropDown:CrewDropDownSlice,
  LocationCreate:LocationCreateSlice,
  CategoryCreate:CategoryCreateSlice,
  CrewCreate:CrewCreateSlice,
  SubCategoryCreate:SubCategoryCreateSlice,
  ExpenseCreate:ExpenseCreateSlice,
  MovieCreate:MovieCreateSlice,

});

const store = configureStore({
	reducer,
});
export default store;
