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
import ExpenseDeleteSlice from '../Slices/ExpenseSlice/ExpenseDelete';
import  MovieDeleteSlice from '../Slices/MasterSlice/MovieSlice/MovieDelete';
import CategoryDeleteSlice from '../Slices/MasterSlice/CategorySlice/CategoryDelete';
import SubCatagoryDeleteSlice from '../Slices/MasterSlice/SubCategorySlice/SubCatagoryDelete';
import LocationDeleteSlice from '../Slices/MasterSlice/LocationSlice/LocationDelete';
import CrewDeleteSlice from '../Slices/MasterSlice/CrewSlice/CrewDelete';
import ExpenseUpdateSlice from '../Slices/ExpenseSlice/ExpenseUpdate';
import MovieUpdateSlice from '../Slices/MasterSlice/MovieSlice/MovieUpdate';
import CategoryUpdateSlice from '../Slices/MasterSlice/CategorySlice/CategoryUpdate';
import SubCategoryUpdateSlice from '../Slices/MasterSlice/SubCategorySlice/SubCategoryUpdate';
import LocationUpdateSlice from '../Slices/MasterSlice/LocationSlice/LocationUpdate';
import CrewUpdateSlice from '../Slices/MasterSlice/CrewSlice/CrewUpdate';
import MovieGetByIdSlice from '../Slices/MasterSlice/MovieSlice/MovieGetById';


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
  ExpenseDelete:ExpenseDeleteSlice,
  MovieDelete:MovieDeleteSlice,
  CategoryDelete:CategoryDeleteSlice,
  SubCatagoryDelete:SubCatagoryDeleteSlice,
  LocationDelete:LocationDeleteSlice,
  CrewDelete:CrewDeleteSlice,
  ExpenseUpdate:ExpenseUpdateSlice,
  MovieUpdate:MovieUpdateSlice,
  CategoryUpdate:CategoryUpdateSlice,
  SubCategoryUpdate:SubCategoryUpdateSlice,
  LocationUpdate:LocationUpdateSlice,
  CrewUpdate:CrewUpdateSlice,
  MovieGetById:MovieGetByIdSlice,



});

const store = configureStore({
	reducer,
});
export default store;
