import React, { useState, useEffect } from "react";
import { Container, Grid, TextField } from "@mui/material";
import "../../Pages/Css/ExpenseSheet.css";
import CustomDropdownMui from "../../Components/CustomDropDown/CustomDropdown";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CusTable from "../../Components/CustomTable/CusTable";
import CustomRadioButton from "../../Components/CustomRadioBtn/CustomRadioButton";
import CustomPhoneNumber from "../../Components/CustomPhoneNb/CustomPhoneNumber";
import * as MASTER from "../../DataEntries/Master/MasterEntries";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../ReduxStore/actions/index";
import { Formik, Form } from "formik";

const CrewTab = () => {
  const dispatch = useDispatch();

  const { CrewCreate } = useSelector((state) => state?.CrewCreate);
  // console.log(CrewCreate);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission
    const phoneNumber = values["phoneNumber"];
    const countryCode = values["phoneNumber_country"];
    const concatenatedPhoneNumber = `${countryCode} ${phoneNumber}`;
    console.log({ ...values, mobile_no: concatenatedPhoneNumber });

    const data1 = {
      data:{ ...values, mobile_no: concatenatedPhoneNumber } ,
      method: "post",
      apiName: "createCrew",
    };

    dispatch(actions.CREWCREATE(data1));

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
    let phoneNumber = "+91 7395893608";
    let firstThree = phoneNumber.slice(0, 3);
    // console.log(firstThree);
    setFieldValue("phoneNumber-country", firstThree);

    setFieldValue("thisphoneNumber", "7395893608");
    setFieldValue("Gender", "0");
    setFieldValue("Natioanlity_input", "india");
  };

  // --------------------------------------------

  const { CrewTableGetAll } = useSelector((state) => state?.CrewTableGetAll);
  // console.log(CrewTableGetAll, "CrewTableGetAll,,,,,,,,,,,,,");

  useEffect(() => {
    const data1 = { data: {}, method: "get", apiName: "getCrewDetails" };

    dispatch(actions.CREWTABLEGETALL(data1));
  }, [dispatch]);

  const [rowTableData, setRowTableData] = useState([
    {
      Sno: "1",
      MovieName: "--",
      location: "--",
      Category: "--",
      SubCategory: "--",
      crew_name: "--",
      gender: "--",
      mobile_no: "--",
      nationality: "--",
      CreatedDate: "--",
    },
  ]);

  useEffect(() => {
    const tempArr1 = [];
    CrewTableGetAll?.data?.map((data, index) => {
      return tempArr1.push({
        // id: data?.company_id
        Sno: index + 1,
        MovieName: data.movie_name,
        location: data.location,
        Category: data.category_name,
        SubCategory: data.sub_category_name,
        crew_name: data.crew_name,
        gender: data.gender,
        mobile_no: data.mobile_no,
        nationality: data.nationality,
        CreatedDate: data.created_on,
      });
    });
    setRowTableData(tempArr1);
  }, [CrewTableGetAll]);

  const { LocationMovieDropDown } = useSelector(
    (state) => state?.LocationMovieDropDown
  );
  const { CategoryDropDown } = useSelector((state) => state?.CategoryDropDown);

  const { SubCategoryDropDown } = useSelector(
    (state) => state?.SubCategoryDropDown
  );
  const { LocationDropDown } = useSelector((state) => state?.LocationDropDown);

  useEffect(() => {
    const data = { data: {}, method: "get", apiName: "getmovieDropdown" };
    const data1 = { data: {}, method: "get", apiName: "dropdownCategory" };
    const data2 = {
      data: {},
      method: "get",
      apiName: "getSubCategoryDropdown",
    };
    const data3 = {
      data: {},
      method: "get",
      apiName: "getCrewshootingDetails",
    };
    dispatch(actions.SUBCATEGORYDROPDOWN(data2));
    dispatch(actions.LOCATIONDROPDOWN(data3));
    dispatch(actions.LOCATIONMOVIEDROPDOWN(data));
    dispatch(actions.CATEGORYDROPDOWN(data1));
    // console.log("Dispatching LOCATIONMOVIEDROPDOWN action:", data);
  }, [dispatch]);

  const [locationMovieDrop, setLocationMovieDrop] = useState([]);
  const [CategoryDropDownDetails, setCategoryDropDownDetails] = useState([]);
  const [SubCategoryDropDownDetails, setSubCategoryDropDownDetails] = useState(
    []
  );
  const [LocationDropDownDetails, setLocationDropDownDetails] = useState([]);

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
  }, [
    LocationMovieDropDown,
    CategoryDropDown,
    SubCategoryDropDown,
    LocationDropDown,
  ]);

  return (
    <div className="expensesheet-div" style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        {/* input field */}
        <Grid item md={12} sx={{ height: "43%" }}>



          <Formik
            initialValues={{
              movie_id: "",
              locations: "",
              category_id: "",
              sub_category_id: "",
              crew_name: "",
              phoneNumber: "",
              gender: "",
              nationality: "",
              phoneNumber_country: "",
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
                        name="locations"
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
                      <CustomDropdownMui
                        label="Category"
                        name="category_id"
                        options={CategoryDropDownDetails}
                        custPlaceholder="Select Category"
                      />
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
                        label="Subcategory"
                        name="sub_category_id"
                        options={SubCategoryDropDownDetails}
                        custPlaceholder="Select Subcategory"
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
                        label="Crew Name"
                        name="crew_name"
                        custPlaceholder="Enter Crew Name"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        marginTop: "5px",
                        paddingLeft: "5.5%",
                      }}
                    >
                      <CustomRadioButton
                        label="Gender"
                        name="gender"
                        options={[
                          { value: "0", label: "Male" },
                          { value: "1", label: "Female" },
                          { value: "2", label: "Others" },
                        ]}
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
                      <CustomPhoneNumber
                        label="Mobile Number"
                        name="phoneNumber"
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
                        label="Nationality"
                        name="nationality"
                        custPlaceholder="Enter Nationality"
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
                    ></Grid>
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

        <Grid item md={12} sx={{ height: "51%" }}>
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
                  TableHeading={MASTER.CrewTableHeaders}
                  Tabledata={rowTableData}
                  TableTittle="Crew"
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default CrewTab;
