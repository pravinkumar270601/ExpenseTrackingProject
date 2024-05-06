import React, { useState, useEffect } from "react";
import CustomDropdownMui from "../../Components/CustomDropDown/CustomDropdown";
import { Container, Grid } from "@mui/material";
import CusTable from "../../Components/CustomTable/CusTable";
import LocationInput from "../../Components/CustomLocation/LocationAdd";
import CustomPhoneNumber from "../../Components/CustomPhoneNb/CustomPhoneNumber";
import * as MASTER from "../../DataEntries/Master/MasterEntries";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../ReduxStore/actions/index";
import { Formik, Form } from "formik";

const LocationTab = () => {
  const [smallBoxes, setSmallBoxes] = useState([]);
  const [locations, setLocations] = useState([""]);
  const dispatch = useDispatch();
  const { LocationCreate } = useSelector((state) => state?.LocationCreate);

  // console.log(LocationCreate)

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const phoneNumber = values["phoneNumber"];
    const countryCode = values["phoneNumber_country"];
    const concatenatedPhoneNumber = `${countryCode} ${phoneNumber}`;
    const smallBoxesString = smallBoxes.join(", ");
    console.log({
      ...values,
      contact_no: concatenatedPhoneNumber,
      location: smallBoxesString,
    });
    const data1 = {
      data:{
        ...values,
        contact_no: concatenatedPhoneNumber,
        location: smallBoxesString,
      } ,
      method: "post",
      apiName: "createSpot",
    };

    dispatch(actions.LOCATIONCREATE(data1));

    // Reset the form
    handleClearSmallBoxes();
    resetForm();
    setSubmitting(false);
  };

  const setDefaultFieldValues = (setFieldValue) => {
    setFieldValue("phoneNumber", 11111111);
    setFieldValue("option", "2");
    let phoneNumber = "+44 1111111122";
    let firstThree = phoneNumber.slice(0, 3);
    // console.log(firstThree);
    setFieldValue("phoneNumber_country", firstThree);

    setSmallBoxes(["pravin", "valla"]);
  };

  const handleClearSmallBoxes = () => {
    setSmallBoxes([]);
    const newLocations = locations.map(() => "");
    setLocations(newLocations);
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
  }, [dispatch]);

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
          // id: data?.company_id,
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
              movie_name: "",
              phoneNumber: "",
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
                        name="movie_name"
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
                      <LocationInput
                        inputHeading={"Location"}
                        locationplaceholder={"Enter Location"}
                        smallBoxes={smallBoxes}
                        setSmallBoxes={setSmallBoxes}
                        locations={locations}
                        setLocations={setLocations}
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
                        onClick={() => {
                          resetForm();
                          handleClearSmallBoxes();
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
                  TableTittle="Location"
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default LocationTab;
