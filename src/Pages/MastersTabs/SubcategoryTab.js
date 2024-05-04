import React, { useState, useEffect } from "react";
import CustomDropdownMui from "../../Components/CustomDropDown/CustomDropdown";
import { Container, Grid } from "@mui/material";
import CusTable from "../../Components/CustomTable/CusTable";
import LocationInput from "../../Components/CustomLocation/LocationAdd";
import * as MASTER from "../../DataEntries/Master/MasterEntries";
import actions from "../../ReduxStore/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";

const SubcategoryTab = () => {
  const [smallBoxes, setSmallBoxes] = useState([]);
  const [locations, setLocations] = useState([""]);

  const { SubCategoryCreate } = useSelector(
    (state) => state?.SubCategoryCreate
  );

  // console.log(SubCategoryCreate);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const smallBoxesString = smallBoxes.join(", ");
    console.log({ ...values, sub_category_name: smallBoxesString });
    const data1 = {
      data:{ ...values, sub_category_name: smallBoxesString },
      method: "post",
      apiName: "createSubCategory",
    };

    dispatch(actions.SUBCATEGORYCREATE(data1));
   

    // Reset the form
    handleClearSmallBoxes();
    resetForm();
    setSubmitting(false);
  };

  const setDefaultFieldValues = (setFieldValue) => {
    setFieldValue("option", "1");
    setFieldValue("option2", "2");
    setSmallBoxes(["pravin", "arun"]);
  };

  const handleClearSmallBoxes = () => {
    setSmallBoxes([]);
    const newLocations = locations.map(() => "");
    setLocations(newLocations);
  };

  // ----------------------------------------------------

  const dispatch = useDispatch();
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

  const { SubCategoryTable } = useSelector((state) => state?.SubCategoryTable);

  useEffect(() => {
    const data1 = { data: {}, method: "get", apiName: "getDetailsSubCategory" };

    dispatch(actions.SUBCATEGORYTABLE(data1));
  }, [dispatch]);

  const [rowTableData, setRowTableData] = useState([
    {
      Sno: "1",
      MovieName: "--",
      Category: "--",
      SubCategory: "--",
      CreatedDate: "--",
    },
  ]);

  useEffect(() => {
    const tempArr1 = [];
    SubCategoryTable?.data?.map((data, index) => {
      return tempArr1.push({
        // id: data?.company_id
        Sno: index + 1,
        MovieName: data.movie_name,
        Category: data.category_name,
        SubCategory: data.sub_category_name,

        CreatedDate: data.created_on,
      });
    });
    setRowTableData(tempArr1);
  }, [SubCategoryTable]);

  const [CategoryDropDownDetails, setCategoryDropDownDetails] = useState([]);

  const { CategoryDropDown } = useSelector((state) => state?.CategoryDropDown);

  // console.log(CategoryDropDown,"CategoryDropDownCategoryDropDown");

  useEffect(() => {
    const data1 = { data: {}, method: "get", apiName: "dropdownCategory" };
    dispatch(actions.CATEGORYDROPDOWN(data1));
  }, [dispatch]);

  useEffect(() => {
    const tempArr = [];
    CategoryDropDown?.data?.map((values, index) =>
      tempArr.push({
        value: values?.category_id,
        label: values?.category_name,
      })
    );

    setCategoryDropDownDetails(tempArr);
  }, [CategoryDropDown]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        <Grid item md={12} sx={{ height: "37%" }}>
          <Formik
            initialValues={{
              movie_id: "",
              category_id: "",
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
                      <LocationInput
                        inputHeading={"Subcategory"}
                        locationplaceholder={"Enter Subcategory"}
                        smallBoxes={smallBoxes}
                        setSmallBoxes={setSmallBoxes}
                        locations={locations}
                        setLocations={setLocations}
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
              marginTop: "15px",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <CusTable
                  TableHeading={MASTER.SubCategoryTableHeaders}
                  Tabledata={rowTableData}
                  TableTittle="Subcategory"
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default SubcategoryTab;
