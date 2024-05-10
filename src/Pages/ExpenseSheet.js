import React, { useState, useEffect, useRef } from "react";
import { Container, Grid } from "@mui/material";
import "../Pages/Css/ExpenseSheet.css";
import userIcon from "../Assets/user.png";
import CusTable from "../Components/CustomTable/CusTable";
import CustomInput from "../Components/CustomInput/CustomInput";
import CustomDropdownMui from "../Components/CustomDropDown/CustomDropdown";
import * as EXPENSESHEET from "../DataEntries/ExpenseSheet/ExpenseSheetEntries";
import CustomDateInput from "../Components/CustomDate/CustomDateInput";
import actions from "../ReduxStore/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import Toast from "../Components/Toast/Toaste";

const ExpenseSheet = () => {
  const [apiUpdateId,setapiUpdateId]=useState(null)
  const validationSchema = Yup.object().shape({
    movie_id: Yup.string().required('Movie Name is required'),
    spot_id: Yup.string().required('Location is required'),
    category_id: Yup.string().required('Category is required'),
    crew_id: Yup.string().required('Crew Name is required'),
    sub_category_id: Yup.string().required('Subcategory is required'),
    advance_amount: Yup.string().required('Advance is required'),
    no_of_staffs: Yup.string().required('Nunber of Persons is required'),
    beta: Yup.string().required('Beta is required'),
    date: Yup.date().required('Date is required'),
   
    

  });


  const [changebtn, setchangebtn] = useState(true);
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [toastMessage, setToastMessage] = useState("");
  const [backColor, setBackColor] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { ExpenseCreate } = useSelector((state) => state?.ExpenseCreate);

  console.log(ExpenseCreate,"ExpenseCreateExpenseCreate")

  const { ExpenseDelete } = useSelector((state) => state?.ExpenseDelete);

  console.log(ExpenseDelete,"ExpenseDeleteExpenseDeleteExpenseDelete");
  
  const { ExpenseGetById } = useSelector((state) => state?.ExpenseGetById);


  const { ExpenseUpdate } = useSelector((state) => state?.ExpenseUpdate);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission
    const date = new Date(values.date);
    const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    // const formattedDate = values.date
    //   ? new Date(values.date).toLocaleDateString("en-GB", {
    //       day: "2-digit",
    //       month: "short",
    //       year: "numeric",
    //     })
    //   : "";


    console.log({ ...values, date_of_shooting: formattedDate });
    if (changebtn === true) {
      const data1 = {
        data: { ...values, date_of_shooting: formattedDate },
        method: "post",
        apiName: "createExpense",
      };

      dispatch(actions.EXPENSECREATE(data1));
      if (ExpenseCreate?.data) {
        triggerToast("Successfully Created!");
        setBackColor("green");
      }else {
        triggerToast("failed");
        setBackColor("red")
      }
    }

    // updating fuction for data

    if (changebtn === false) {
      const data2 = {
        data: { ...values, date_of_shooting: formattedDate },
        method: "put",
        apiName: `updateexpense/${apiUpdateId}`,
      };
      dispatch(actions.EXPENSEUPDATE(data2));
      setchangebtn(true);
      console.log(apiUpdateId);
      if (ExpenseUpdate?.data) {
        triggerToast("Successfully Updated");
        setBackColor("green")
      } else {
        triggerToast("failed");
        setBackColor("red")
      }
    }

    // Reset the form
    resetForm();
    setSubmitting(false);
  };
  // Function to set default field values

  // const setmyDefaultFieldValues = (id) => {
  //   console.log(id, "edit id");
  //   const data = { data: {}, method: "get", apiName: `getExpenseById/${id}` };
  //   dispatch(actions.EXPENSEGETBYID(data));
  //   const { setFieldValue } = formikRef.current;
  //   if (setFieldValue) {
  //     setFieldValue("movie_id", ExpenseGetById.data[0]?.movie_id);
  //     setFieldValue("spot_id", ExpenseGetById.data[0]?.spot_id);
  //     setFieldValue("category_id", ExpenseGetById.data[0]?.category_id);
  //     setFieldValue("sub_category_id", ExpenseGetById.data[0]?.sub_category_id);
  //     setFieldValue("crew_id", ExpenseGetById.data[0]?.crew_id);
  //     setFieldValue("advance_amount", ExpenseGetById.data[0]?.advance_amount);
  //     setFieldValue("no_of_staffs", ExpenseGetById.data[0]?.no_of_staffs);
  //     setFieldValue("beta", ExpenseGetById.data[0]?.beta);
  //     setFieldValue("date","2024-05-09" );
  //   }
  //   setchangebtn(false);
  // };

  const triggerToast = (message) => {
    console.log(message, "toast work successfully");
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Toast will disappear after 3 seconds
  };
  const setmyDefaultFieldValues = async (id) => {
    console.log(id, "edit id");

    try {
      const response = await axios.get(
        `http://122.165.52.124:4000/api/v1/getExpenseById/${id}`
      );
      const ExpenseDataid = await response.data;
      console.log(ExpenseDataid.data, "ExpenseDataid"); // Assuming your API returns movie data

      const { setFieldValue } = formikRef.current;
      if (setFieldValue) {
            setFieldValue("movie_id", ExpenseDataid.data[0]?.movie_id);
            setFieldValue("spot_id", ExpenseDataid.data[0]?.spot_id);
            setFieldValue("category_id", ExpenseDataid.data[0]?.category_id);
            setFieldValue("sub_category_id", ExpenseDataid.data[0]?.sub_category_id);
            setFieldValue("crew_id", ExpenseDataid.data[0]?.crew_id);
            setFieldValue("advance_amount", ExpenseDataid.data[0]?.advance_amount);
            setFieldValue("no_of_staffs", ExpenseDataid.data[0]?.no_of_staffs);
            setFieldValue("beta", ExpenseDataid.data[0]?.daily_beta);
            setFieldValue("date",ExpenseDataid.data[0]?.date_of_shooting);
          }

      setchangebtn(false);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      // Handle error
    }
    setapiUpdateId(id)
  };

  const handleDelete = (id) => {
    // console.log(id,"idididididididididi");
    // if (MovieDeleteId !== null) {
    const data = {
      data: {},
      method: "DELETE",
      apiName: `deleteExpense/${id}`,
    };
    dispatch(actions.EXPENSEDELETE(data));
    if (ExpenseDelete?.data) {
      triggerToast("Successfully Deleted!");
      setBackColor("green")
    } else {
      triggerToast("failed");
      setBackColor("red")
    }
  };

  // --------------------------------------------

  const { ExpenseSheetTable } = useSelector(
    (state) => state?.ExpenseSheetTable
  );
  // console.log(ExpenseSheetTable, "ExpenseSheetTable,,,,,,,,,,,,,");

  useEffect(() => {
    const data1 = { data: {}, method: "get", apiName: "getExpense" };

    dispatch(actions.EXPENSESHEETTABLE(data1));
  }, [dispatch,ExpenseCreate,ExpenseDelete, ExpenseUpdate]);

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
        id: data?.expense_id,
        Sno: index + 1,
        MovieName: data.movie_name,
        location: data.location,
        Date: data.Date,
        crew_name: data.crew_name,
        Category: data.category_name,
        SubCategory: data.sub_category_name,
        NUmberofpersons: data.no_of_staffs,
        Advance: data.advance_amount,
        Beta: data.daily_beta,
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


  const [movieDropDownIdSelect, setmovieDropDownIdSelect] = useState("");

  const selectmovieIdfn = (name, id) => {
    console.log(name, "selectmovieIdfn");
    console.log(id, "selectmovieIdfn");
    setmovieDropDownIdSelect(id);

    const data3 = {
      data: { movie_id: id },
      method: "post",
      apiName: "getCrewshootingDetails",
    };
    dispatch(actions.LOCATIONDROPDOWN(data3));

    const data1 = {
      data: { movie_id: id },
      method: "post",
      apiName: "dropdownCategory",
    };
    dispatch(actions.CATEGORYDROPDOWN(data1));

    const data4 = { data: {movie_id: id}, method: "post", apiName: "getCrewDropDown" };
    dispatch(actions.CREWDROPDOWN(data4));
  };


  const selectCategoryIdfn = (name, id) => {
    const data2 = {
      data: { category_id: id, movie_id: movieDropDownIdSelect },
      method: "post",
      apiName: "getSubCategoryDropdown",
    };
    dispatch(actions.SUBCATEGORYDROPDOWN(data2));
  };

  useEffect(() => {

    const data = { data: {}, method: "get", apiName: "getmovieDropdown" };
    dispatch(actions.LOCATIONMOVIEDROPDOWN(data));

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
    <div className="expensesheet-div">
      <Grid container md={12} sx={{ minHeight: "100vh",
          maxHeight: "100%",   }}>
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
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
          >
            {({ isSubmitting, resetForm,setFieldValue }) => (
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
                        setFieldValue={setFieldValue}
                        selectmovieIdfn={selectmovieIdfn}
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
                        setFieldValue={setFieldValue}
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
                        setFieldValue={setFieldValue}
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
                        setFieldValue={setFieldValue}
                        selectCategoryIdfn={selectCategoryIdfn}
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
                        setFieldValue={setFieldValue}
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
                        inputType={"number"}
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
                        inputType={"number"}
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
                        label="Daily Beta"
                        name="beta"
                        inputType={"number"}
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
                      {changebtn ? (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="expense-submit-btn"
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="expense-submit-btn"
                        >
                          Update
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setchangebtn(true);
                        }}
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
                  handleDelete={handleDelete}
                  setmyDefaultFieldValues={setmyDefaultFieldValues}
                  TableTittle="Expense"
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      {showToast && (
        <Toast message={toastMessage} backColor={backColor}/>
      )}
    </div>
  );
};

export default ExpenseSheet;
