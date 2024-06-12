import React, { useState, useEffect, useRef } from "react";
import CustomDropdownMui from "../../Components/CustomDropDown/CustomDropdown";
import { Container, Grid } from "@mui/material";
import CusTable from "../../Components/CustomTable/CusTable";
import LocationInput from "../../Components/CustomLocation/LocationAdd";
import CustomPhoneNumber from "../../Components/CustomPhoneNb/CustomPhoneNumber";
import * as MASTER from "../../DataEntries/Master/MasterEntries";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../ReduxStore/actions/index";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toast from "../../Components/Toast/Toaste";

const LocationTab = () => {
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const [apiUpdateId, setapiUpdateId] = useState(null);

  const validationSchema = Yup.object().shape({
    movie_id: Yup.string().required("Movie name is required"),
    phoneNumber: Yup.string().required("PhoneNumber is required"),
  });
  const [toastMessage, setToastMessage] = useState("");
  const [backColor, setBackColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [smallBoxes, setSmallBoxes] = useState([]);
  const [locations, setLocations] = useState([""]);
  const [changebtn, setchangebtn] = useState(true);
  const dispatch = useDispatch();
  const formikRef = useRef();

  const { LocationCreate } = useSelector((state) => state?.LocationCreate);
  const { LocationUpdate } = useSelector((state) => state?.LocationUpdate);
  const { LocationDelete } = useSelector((state) => state?.LocationDelete);

  console.log(smallBoxes,"smallBoxes1");



  

  // console.log(LocationUpdate)
  // console.log(LocationCreate)

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // if (locations.some(location => location.trim() === "")) {
    //   setErrorMessage("Location is Required*");
    //   // setSubmitting(false);
    //   return;
    // }

    const phoneNumber = values["phoneNumber"];
    const countryCode = values["phoneNumber_country"];
    const concatenatedPhoneNumber = `${countryCode} ${phoneNumber}`;
    // const smallBoxesString = smallBoxes.join(", ");
    console.log({
      ...values,
      contact_no: concatenatedPhoneNumber,
      locations: smallBoxes,
    });

    if (changebtn) {
      const data1 = {
        data: {
          ...values,
          contact_no: concatenatedPhoneNumber,
          locations: smallBoxes,
        },
        method: "post",
        apiName: "createSpot",
      };

      dispatch(actions.LOCATIONCREATE(data1));
      if (LocationCreate?.data) {
        triggerToast("Successfully Created!");
        setBackColor("green");
      }else {
        triggerToast("failed");
        setBackColor("red")
      }
    }

    // updating fuction for data

    if (changebtn === false) {
      // console.log(smallBoxes[0].name,"update");
      console.log({
        ...values,
        contact_no: concatenatedPhoneNumber,
        location: smallBoxes[0].name,
      },'update1');
      const data2 = {
        data: {
          ...values,
          contact_no: concatenatedPhoneNumber,
          location: smallBoxes[0].name,
        },
        method: "put",
        apiName: `updatespot/${apiUpdateId}`,
      };

      dispatch(actions.LOCATIONUPDATE(data2));
      setchangebtn(true);

      if (LocationUpdate?.data) {
        triggerToast("Successfully Updated");
        setBackColor("green")
      } else {
        triggerToast("failed");
        setBackColor("red")
      }
    }

    // Reset the form
    handleClearSmallBoxes();
    resetForm();
    setSubmitting(false);
  };
  const { LoactionGetById } = useSelector((state) => state?.LoactionGetById);

  console.log(LoactionGetById.data, "LoactionGetByIdLoactionGetById");

  // const setmyDefaultFieldValues = (id) => {
  //   console.log(id, "edit id");
  //   const data = { data: {}, method: "get", apiName: `getspotById/${id}` };
  //   dispatch(actions.LOACTIONGETBYID(data));

  //   const { setFieldValue } = formikRef.current;

  //   if (setFieldValue) {
  //     let afterThree = LoactionGetById.data?.contact_no;
  //     afterThree = afterThree?.slice(3);
  //     setFieldValue("phoneNumber",Number(afterThree));
  //     setFieldValue("movie_id", LoactionGetById.data?.movie_id);
  //     let phoneNumber = LoactionGetById.data?.contact_no;
  //     let firstThree = phoneNumber?.slice(0, 3);
  //     console.log(firstThree);
  //     setFieldValue("phoneNumber_country", firstThree);

  //     setSmallBoxes([...LoactionGetById.data?.location?.split(/[\s,]+/)]);
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
        `http://122.165.52.124:4000/api/v1/getspotById/${id}`
      );
      const LoactionDataid = await response.data;
      console.log(LoactionDataid.data, "LoactionDataid"); // Assuming your API returns movie data

      const { setFieldValue } = formikRef.current;
      if (setFieldValue) {
        let afterThree = LoactionDataid.data?.contact_no;
        afterThree = afterThree?.slice(3);
        setFieldValue("phoneNumber", Number(afterThree));
        setFieldValue("movie_id", LoactionDataid.data?.movie_id);
        let phoneNumber = LoactionDataid.data?.contact_no;
        let firstThree = phoneNumber?.slice(0, 3);
        console.log(firstThree);
        setFieldValue("phoneNumber_country", firstThree);

        setSmallBoxes([{name:LoactionDataid.data?.location}]);
        // console.log(LoactionDataid.data?.location?.split(","),"LoactionDataid.data?.location?.split");


      }

      setchangebtn(false);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      // Handle error
    }
    setapiUpdateId(id);
  };

  const handleClearSmallBoxes = () => {
    setSmallBoxes([]);
    const newLocations = locations.map(() => "");
    setLocations(newLocations);
  };

  //datele---------

  const handleDelete = (id) => {
    // console.log(id,"idididididididididi");
    // if (MovieDeleteId !== null) {
    const data = {
      data: {},
      method: "DELETE",
      apiName: `deletespot/${id}`,
    };
    dispatch(actions.LOCATIONDELETE(data));
    if (LocationDelete?.data) {
      triggerToast("Successfully Deleted!");
      setBackColor("green")
    } else {
      triggerToast("failed");
      setBackColor("red")
    }
  };

  // ----------------------------------------------------

  const { LocationMovieDropDown } = useSelector(
    (state) => state?.LocationMovieDropDown
  );
  // console.log(LocationMovieDropDown, "lllllllll");

  useEffect(() => {
    const data = { data: {}, method: "get", apiName: "getmovieDropdown" };
    // console.log("Dispatching LOCATIONMOVIEDROPDOWN action:", data);
    dispatch(actions.LOCATIONMOVIEDROPDOWN(data));
    // console.log(data, "apiCAllllllllllll");
  }, [dispatch]);

  const [locationMovieDrop, setLocationMovieDrop] = useState([]);
  useEffect(() => {
    const tempArr = [];
    LocationMovieDropDown?.data?.map((values, index) =>
      tempArr.push({
        value: values?.movie_id,
        label: values?.movie_name,
      })
    );
    setLocationMovieDrop(tempArr);
  }, [LocationMovieDropDown]);

  const { LocationTableGetAll } = useSelector(
    (state) => state?.LocationTableGetAll
  );
  // console.log(LocationTableGetAll, "LocationTableGetAll................");

  useEffect(() => {
    const data1 = { data: {}, method: "get", apiName: "getspotDetails" };
    // console.log("Dispatching LOCATIONTABLEGETALL action:", data1);
    dispatch(actions.LOCATIONTABLEGETALL(data1));
    // console.log(data1, "data1LOCATIONTABLEGETALL.................");
  }, [LocationCreate, LocationUpdate, LocationDelete]);

  const [rowTableData, setRowTableData] = useState([
    {
      Sno: "1",
      MovieName: "--",
      Location: "--",
      MobileNumber: "--",
      CreatedDate: "--",
    },
  ]);

  useEffect(() => {
    const tempArr1 = [];
    // console.log(LocationTableGetAll.data,"ccccccccccccccccc")
    if (LocationTableGetAll && LocationTableGetAll.data) {
      LocationTableGetAll?.data?.map((data, index) => {
        return tempArr1.push({
          id: data?.spot_id,
          Sno: index + 1,
          MovieName: data.movie_name,
          Location: data.location,
          MobileNumber: data.contact_no,
          CreatedDate: data.created_on,
        });
      });
      setRowTableData(tempArr1);
    }
    // console.log(tempArr1, "tempArr1(((((((((((((((((()))))))))");
  }, [LocationTableGetAll]);

  // console.log(rowTableData, "rowTableData................................");

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        <Grid item md={12} sx={{ height: "37%" }}>
          <Formik
            initialValues={{
              movie_id: "",
              phoneNumber: "",
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
                    padding: "10px 20px",
                    borderRadius: "15px",
                    height: "100%",

                    // Ensure the Container takes full height
                  }}
                >
                  <Grid container style={{ height: "100%" }}>
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
                        // form={formikRef.current}
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
                      <LocationInput
                        inputHeading={"Location"}
                        locationplaceholder={"Enter Location"}
                        smallBoxes={smallBoxes}
                        setSmallBoxes={setSmallBoxes}
                        locations={locations}
                        setLocations={setLocations}
                        errorMessage={errorMessage}
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
                          handleClearSmallBoxes();
                          setchangebtn(true);
                          if (
                            locations.some((location) => location.trim() === "")
                          ) {
                            setErrorMessage(null);
                            // setSubmitting(false);
                            return;
                          }
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

        <Grid item md={12} sx={{ height: "63%" }}>
          <Container
            style={{
              width: "95%",
              padding: "0px",
              // borderRadius: "10px",
              marginTop: "15px",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <CusTable
                  TableHeading={MASTER.LocationTableHeaders}
                  Tabledata={rowTableData}
                  setmyDefaultFieldValues={setmyDefaultFieldValues}
                  handleDelete={handleDelete}
                  TableTittle="Location"
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

export default LocationTab;
