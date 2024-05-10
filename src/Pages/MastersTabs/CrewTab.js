import React, { useState, useEffect, useRef } from "react";
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
import * as Yup from "yup";
import axios from "axios";
import Toast from "../../Components/Toast/Toaste";

const CrewTab = () => {
  const [apiUpdateId, setapiUpdateId] = useState(null);
  const [changebtn, setchangebtn] = useState(true);

  const [toastMessage, setToastMessage] = useState("");
  const [backColor, setBackColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const validationSchema = Yup.object().shape({
    movie_id: Yup.string().required("Movie Name is required"),
    category_id: Yup.string().required("Category is required"),
    sub_category_id: Yup.string().required("Subcategory is required"),
    crew_name: Yup.string().required("Crew Name is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const dispatch = useDispatch();
  const formikRef = useRef();

  const { CrewCreate } = useSelector((state) => state?.CrewCreate);
  const { CrewUpdate } = useSelector((state) => state?.CrewUpdate);
  const { CrewDelete } = useSelector((state) => state?.CrewDelete);
  const { CrewGetById } = useSelector((state) => state?.CrewGetById);

  // console.log(CrewCreate);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission

    const phoneNumber = values["phoneNumber"];
    const countryCode = values["phoneNumber_country"];
    const concatenatedPhoneNumber = `${countryCode} ${phoneNumber}`;
    console.log({ ...values, mobile_no: concatenatedPhoneNumber });

    if (changebtn === true) {
      const data1 = {
        data: { ...values, mobile_no: concatenatedPhoneNumber },
        method: "post",
        apiName: "createCrew",
      };

      dispatch(actions.CREWCREATE(data1));
       if (CrewCreate?.data) {
        triggerToast("Successfully Created!");
        setBackColor("green");
      }else {
        triggerToast("failed");
        setBackColor("red")
      }
    }

    if (changebtn === false) {
      const data2 = {
        data: { ...values, mobile_no: concatenatedPhoneNumber },
        method: "put",
        apiName: `updateCrew/${apiUpdateId}`,
      };

      dispatch(actions.CREWUPDATE(data2));
      setchangebtn(true);
      if (CrewUpdate?.data) {
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
  //   const data = { data: {}, method: "get", apiName: `getCrewUserById/${id}` };
  //   dispatch(actions.CREWGETBYID(data));
  //   const { setFieldValue } = formikRef.current;
  //   if (setFieldValue) {
  //     setFieldValue("movie_id", CrewGetById.data[0]?.movie_id);
  //     setFieldValue("spot_id", CrewGetById.data[0]?.spot_id);
  //     setFieldValue("category_id", CrewGetById.data[0]?.category_id);
  //     setFieldValue("sub_category_id", CrewGetById.data[0]?.sub_category_id);
  //     setFieldValue("crew_name", CrewGetById.data[0]?.crew_name);
  //     let afterThree = CrewGetById.data[0]?.mobile_no;
  //       afterThree = afterThree.slice(3)
  //     setFieldValue("phoneNumber", Number(afterThree));
  //     let phoneNumber = CrewGetById.data[0]?.mobile_no;
  //     let firstThree = phoneNumber.slice(0, 3);
  //     console.log(firstThree);
  //     setFieldValue("phoneNumber_country", firstThree);
  //     setFieldValue("gender", `${CrewGetById.data[0]?.gender}`);
  //     setFieldValue("nationality", CrewGetById.data[0]?.nationality);
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
        `http://122.165.52.124:4000/api/v1/getCrewUserById/${id}`
      );
      const CrewDataid = await response.data;
      console.log(CrewDataid.data, "CrewDataid"); // Assuming your API returns movie data

      const { setFieldValue } = formikRef.current;
      if (setFieldValue) {
        setFieldValue("movie_id", CrewDataid.data[0]?.movie_id);
        setFieldValue("category_id", CrewDataid.data[0]?.category_id);
        setFieldValue("sub_category_id", CrewDataid.data[0]?.sub_category_id);
        setFieldValue("crew_name", CrewDataid.data[0]?.crew_name);
        let afterThree = CrewDataid.data[0]?.mobile_no;
        afterThree = afterThree.slice(3);
        setFieldValue("phoneNumber", Number(afterThree));
        let phoneNumber = CrewDataid.data[0]?.mobile_no;
        let firstThree = phoneNumber.slice(0, 3);
        console.log(firstThree);
        setFieldValue("phoneNumber_country", firstThree);
        setFieldValue("gender", `${CrewDataid.data[0]?.gender}`);
      }

      setchangebtn(false);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      // Handle error
    }
    setapiUpdateId(id);
  };

  const handleDelete = (id) => {
    // console.log(id,"idididididididididi");
    // if (MovieDeleteId !== null) {
    const data = {
      data: {},
      method: "DELETE",
      apiName: `deleteCrew/${id}`,
    };
    dispatch(actions.CREWDELETE(data));
    if (CrewDelete?.data) {
      triggerToast("Successfully Deleted!");
      setBackColor("green")
    } else {
      triggerToast("failed");
      setBackColor("red")
    }
  };

  // --------------------------------------------

  const { CrewTableGetAll } = useSelector((state) => state?.CrewTableGetAll);
  // console.log(CrewTableGetAll, "CrewTableGetAll,,,,,,,,,,,,,");

  useEffect(() => {
    const data1 = { data: {}, method: "get", apiName: "getCrewDetails" };

    dispatch(actions.CREWTABLEGETALL(data1));
  }, [dispatch, CrewCreate, CrewUpdate, CrewDelete]);

  const [rowTableData, setRowTableData] = useState([
    {
      Sno: "1",
      MovieName: "--",
      
      Category: "--",
      SubCategory: "--",
      crew_name: "--",
      gender: "--",
      mobile_no: "--",
      
      CreatedDate: "--",
    },
  ]);

  useEffect(() => {
    const tempArr1 = [];
    CrewTableGetAll?.data?.map((data, index) => {
      return tempArr1.push({
        id: data?.crew_id,
        Sno: index + 1,
        MovieName: data.movie_name,
        Category: data.category_name,
        SubCategory: data.sub_category_name,
        crew_name: data.crew_name,
        gender: data.gender,
        mobile_no: data.mobile_no,
        
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
              category_id: "",
              sub_category_id: "",
              crew_name: "",
              phoneNumber: "",
              gender: "",
              phoneNumber_country: "+91",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
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
                      <CustomInput
                        label="Crew Name"
                        name="crew_name"
                        inputType={"text"}
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
                        paddingLeft: "2.5%",
                      }}
                    >
                      <CustomRadioButton
                        label="Gender"
                        name="gender"
                        options={[
                          { value: "1", label: "Male" },
                          { value: "2", label: "Female" },
                          { value: "3", label: "Others" },
                        ]}
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
                    <CustomPhoneNumber
                        label="Mobile Number"
                        name="phoneNumber"
                      />  

                    </Grid>

                    {/* Third Row
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "start",

                        marginTop: "5px",
                      }}
                    >
                      
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
                     
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "end",

                        marginTop: "5px",
                      }}
                    ></Grid> */}
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
                        marginTop: "10px",
                        marginBottom:"7px"
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

        <Grid item md={12} sx={{ height: "51%" ,marginTop:"10px"}}>
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
                  setmyDefaultFieldValues={setmyDefaultFieldValues}
                  handleDelete={handleDelete}
                  TableTittle="Crew"
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

export default CrewTab;
