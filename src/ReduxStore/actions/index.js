
// import { RptLoadNoDropDownAction } from "../slices/Reports/RptLoadNoDropDown";
import { CategoryTableGetAllAction } from "../Slices/MasterSlice/CategorySlice/CategoryTableGetAll";
import { CrewTableGetAllAction } from "../Slices/MasterSlice/CrewSlice/CrewTableGetAll";
import { LocationMovieDropDownAction } from "../Slices/MasterSlice/LocationSlice/LocationMovieDropDown";
import { LocationTableGetAllAction } from "../Slices/MasterSlice/LocationSlice/LocationTableGetAll";
import { MoviesTableGetAllAction } from "../Slices/MasterSlice/MovieSlice/MoviesTableGetAll";
import { SubCategoryTableAction } from "../Slices/MasterSlice/SubCategorySlice/SubCategoryTable";
import { ExpenseSheetTableAction } from "../Slices/ExpenseSlice/ExpenseSheetTable";
import { CategoryDropDownAction } from "../Slices/ExpenseSlice/CategoryDropDown";
import { LocationDropDownAction } from "../Slices/ExpenseSlice/LocationDropDown";
import { SubCategoryDropDownAction } from "../Slices/ExpenseSlice/SubCategoryDropDown";
import { CrewDropDownAction } from "../Slices/ExpenseSlice/CrewDropDown";
import { CategoryCreateAction } from "../Slices/MasterSlice/CategorySlice/CategoryCreate";
import { CrewCreateAction } from "../Slices/MasterSlice/CrewSlice/CrewCreate";
import { LocationCreateAction } from "../Slices/MasterSlice/LocationSlice/LocationCreate";
import { MovieCreateAction } from "../Slices/MasterSlice/MovieSlice/MovieCreate";
import { SubCategoryCreateAction } from "../Slices/MasterSlice/SubCategorySlice/SubCategoryCreate";
import { ExpenseCreateAction } from "../Slices/ExpenseSlice/ExpenseCreate";



const actions = {

  // ...RptLoadNoDropDownAction,
  // ...RptStatusDropDownAction,
  ...LocationMovieDropDownAction,
  ...MoviesTableGetAllAction,
  ...LocationTableGetAllAction,
  ...CategoryTableGetAllAction,
  ...SubCategoryTableAction,
  ...CrewTableGetAllAction,
  ...ExpenseSheetTableAction,
  ...CategoryDropDownAction,
  ...SubCategoryDropDownAction,
  ...LocationDropDownAction,
  ...CrewDropDownAction,
  ...MovieCreateAction,
  ...LocationCreateAction,
  ...CategoryCreateAction,
  ...CrewCreateAction,
  ...SubCategoryCreateAction,
  ...ExpenseCreateAction,


};

export default actions;
