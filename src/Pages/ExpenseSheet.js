import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import "../Pages/Css/ExpenseSheet.css";
import userIcon from "../Assets/wp5609640-broly-computer-wallpapers.jpg";
import CusTable from "../Components/CustomTable/CusTable";
import CustomInput from "../Components/CustomInput/CustomInput";
import CustomDropdownMui from "../Components/CustomDropDown/CustomDropdown";
import * as EXPENSESHEET from "../DataEntries/ExpenseSheet/ExpenseSheetEntries";
import CustomDateInput from "../Components/CustomDate/CustomDateInput";
import actions from "../ReduxStore/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";

const ExpenseSheet = () => {
  const { ExpenseCreate } = useSelector((state) => state?.ExpenseCreate);
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission
    const formattedDate = values.date
      ? new Date(values.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";
    console.log({ ...values, created_on: formattedDate });
    const data1 = {
      data: { ...values, created_on: formattedDate },
      method: "post",
      apiName: "createExpense",
    };

    dispatch(actions.EXPENSECREATE(data1));

    // Reset the form
    resetForm();
    setSubmitting(false);
  };
  // Function to set default field values
  const setDefaultFieldValues = (setFieldValue) => {
    setFieldValue("MovieName", "99");
    setFieldValue("MovieName2", "95");
    setFieldValue("Category", "96");
    setFieldValue("Subcategory", "94");
    setFieldValue("CrewName", "front end");
    setFieldValue("Subcategory2", "22");
    setFieldValue("Natioanlity_input", "india");
    setFieldValue("date", "23 Apr 2024");
  };

  // --------------------------------------------

  const dispatch = useDispatch();

  const { ExpenseSheetTable } = useSelector(
    (state) => state?.ExpenseSheetTable
  );
  // console.log(ExpenseSheetTable, "ExpenseSheetTable,,,,,,,,,,,,,");

  useEffect(() => {
    const data1 = { data: {}, method: "get", apiName: "getExpense" };

    dispatch(actions.EXPENSESHEETTABLE(data1));
  }, [dispatch]);

  const [rowTableData, setRowTableData] = useState([
    {
      Sno: "1",
      MovieName: "--",
      location: "--",
      Date: "--",
      crew_name: "--",
      Category: "--",
      SubCategory: "--",
      NUmberofpersons: "--",
      Advance: "--",
      Beta: "--",
    },
  ]);

  useEffect(() => {
    const tempArr1 = [];
    ExpenseSheetTable?.data?.map((data, index) => {
      return tempArr1.push({
        // id: data?.company_id
        Sno: index + 1,
        MovieName: data.movie_name,
        location: data.location,
        Date: data.date_of_shooting,
        crew_name: data.crew_name,
        Category: data.category_name,
        SubCategory: data.sub_category_name,
        NUmberofpersons: data.no_of_staffs,
        Advance: data.advance_amount,
        Beta: data.beta,
      });
    });
    setRowTableData(tempArr1);
  }, [ExpenseSheetTable]);
  //-------------------------------------------------------

  const { LocationMovieDropDown } = useSelector(
    (state) => state?.LocationMovieDropDown
  );
  const { CategoryDropDown } = useSelector((state) => state?.CategoryDropDown);

  const { SubCategoryDropDown } = useSelector(
    (state) => state?.SubCategoryDropDown
  );
  const { LocationDropDown } = useSelector((state) => state?.LocationDropDown);

  const { CrewDropDown } = useSelector((state) => state?.CrewDropDown);

  useEffect(() => {
    const data = { data: {}, method: "get", apiName: "getmovieDropdown" };
    const data1 = { data: {}, method: "get", apiName: "dropdownCategory" };
    const data4 = { data: {}, method: "get", apiName: "getCrewDropDown" };

    const data2 = {
      data: {},
      method: "get",
      apiName: "getSubCategoryDropdown",
    };
    const data3 = {
      data: {},
      method: "get",
      apiName: "getCrewShootingDetails",
    };
    dispatch(actions.SUBCATEGORYDROPDOWN(data2));
    dispatch(actions.LOCATIONDROPDOWN(data3));
    dispatch(actions.LOCATIONMOVIEDROPDOWN(data));
    dispatch(actions.CATEGORYDROPDOWN(data1));
    dispatch(actions.CREWDROPDOWN(data4));
    // console.log("Dispatching LOCATIONMOVIEDROPDOWN action:", data);
  }, [dispatch]);

  const [locationMovieDrop, setLocationMovieDrop] = useState([]);
  const [CategoryDropDownDetails, setCategoryDropDownDetails] = useState([]);
  const [SubCategoryDropDownDetails, setSubCategoryDropDownDetails] = useState(
    []
  );
  const [LocationDropDownDetails, setLocationDropDownDetails] = useState([]);

  const [CrewDropDownDetails, setCrewDropDownDetails] = useState([]);

  useEffect(() => {
    const tempArr = [];
    LocationMovieDropDown?.data?.map((values, index) =>
      tempArr.push({
        value: values?.movie_id,
        label: values?.movie_name,
      })
    );

    setLocationMovieDrop(tempArr);

    const tempArr1 = [];
    CategoryDropDown?.data?.map((values, index) =>
      tempArr1.push({
        value: values?.category_id,
        label: values?.category_name,
      })
    );
    setCategoryDropDownDetails(tempArr1);
    const tempArr2 = [];
    SubCategoryDropDown?.data?.map((values, index) =>
      tempArr2.push({
        value: values?.sub_category_id,
        label: values?.sub_category_name,
      })
    );
    setSubCategoryDropDownDetails(tempArr2);

    const tempArr3 = [];
    LocationDropDown?.data?.map((values, index) =>
      tempArr3.push({
        value: values?.spot_id,
        label: values?.location,
      })
    );

    setLocationDropDownDetails(tempArr3);

    const tempArr4 = [];
    CrewDropDown?.data?.map((values, index) =>
      tempArr4.push({
        value: values?.crew_id,
        label: values?.crew_name,
      })
    );
    setCrewDropDownDetails(tempArr4);
  }, [
    LocationMovieDropDown,
    CategoryDropDown,
    SubCategoryDropDown,
    LocationDropDown,
    CrewDropDown,
  ]);

  return (
    <div className="expensesheet-div" style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        <Grid
          item
          md={12}
          sx={{
            height: "12%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="pages-h1">
            <h1>Expense Sheet</h1>
          </div>
          <div className="d-flex align-items-end">
            <div className=" user-div d-flex ">
              <div className="username">Username </div>
              <div className="user-img-div">
                <img src={userIcon} alt="User" />
              </div>
            </div>
          </div>
        </Grid>
        {/* input field */}
        <Grid item md={12} sx={{ height: "43%" }}>
          <Formik
            initialValues={{
              movie_id: "",
              spot_id: "",
              category_id: "",
              sub_category_id: "",
              crew_id: "",
              advance_amount: "",
              no_of_staffs: "",
              beta: "",
              date: null,
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, resetForm, setFieldValue }) => (
              <Form>
                <Container
                  style={{
                    width: "95%",
                    backgroundColor: "white",
                    padding: "0px 20px 5px",
                    borderRadius: "15px",
                  }}
                >
                  <Grid container>
                    {/* First Row */}
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        marginTop: "5px",
                      }}
                    >
                      <CustomDropdownMui
                        label="Movie Name"
                        name="movie_id"
                        options={locationMovieDrop}
                        custPlaceholder="Select Movie"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "5px",
                      }}
                    >
                      <CustomDropdownMui
                        label="Location"
                        name="spot_id"
                        options={LocationDropDownDetails}
                        custPlaceholder="Select Location"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "5px",
                      }}
                    >
                      <CustomDateInput label="Date" name="date" />
                    </Grid>

                    {/* Second Row */}
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        marginTop: "5px",
                      }}
                    >
                      <CustomDropdownMui
                        label="Crew Name"
                        name="crew_id"
                        options={CrewDropDownDetails}
                        custPlaceholder="Select Crew"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "center",

                        marginTop: "5px",
                      }}
                    >
                      <CustomDropdownMui
                        label="Category"
                        name="category_id"
                        options={CategoryDropDownDetails}
                        custPlaceholder="Select Category"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "5px",
                      }}
                    >
                      <CustomDropdownMui
                        label="Subcategory"
                        name="sub_category_id"
                        options={SubCategoryDropDownDetails}
                        custPlaceholder="Select Subcategory"
                      />
                    </Grid>

                    {/* Third Row */}
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "start",

                        marginTop: "5px",
                      }}
                    >
                      <CustomInput
                        label="Number of Persons"
                        name="no_of_staffs"
                        custPlaceholder="Enter Number of Persons"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "center",

                        marginTop: "5px",
                      }}
                    >
                      <CustomInput
                        label="Advance"
                        name="advance_amount"
                        custPlaceholder="Enter Advance"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "end",

                        marginTop: "5px",
                      }}
                    >
                      <CustomInput
                        label="Beta"
                        name="beta"
                        custPlaceholder="Enter Beta"
                      />
                    </Grid>
                    {/* {fourth Row} */}
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        marginTop: "5px",
                      }}
                    >
                      {true ? (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="expense-submit-btn"
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDefaultFieldValues(setFieldValue)}
                          className="expense-submit-btn"
                        >
                          Update
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => resetForm()}
                        className="expense-cancel-btn"
                      >
                        Cancel
                      </button>
                    </Grid>
                  </Grid>
                </Container>
              </Form>
            )}
          </Formik>
        </Grid>

        <Grid item md={12} sx={{ height: "45%" }}>
          <Container
            style={{
              width: "95%",
              padding: "0px",
              marginTop: "5px",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <CusTable
                  TableHeading={EXPENSESHEET.ExpenseSheetTableHeaders}
                  Tabledata={rowTableData}
                  TableTittle="Expense"
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExpenseSheet;
