import React, { useState, useEffect, useRef } from "react";
import CustomDropdownMui from "../../Components/CustomDropDown/CustomDropdown";
import { Container, Grid } from "@mui/material";
import CusTable from "../../Components/CustomTable/CusTable";
import LocationInput from "../../Components/CustomLocation/LocationAdd";
import * as MASTER from "../../DataEntries/Master/MasterEntries";
import actions from "../../ReduxStore/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toast from "../../Components/Toast/Toaste";

const SubcategoryTab = () => {
  const [apiUpdateId, setapiUpdateId] = useState(null);

  const validationSchema = Yup.object().shape({
    movie_id: Yup.string().required("Movie name is required"),

    category_id: Yup.string().required("Category is required"),
  });

  const [changebtn, setchangebtn] = useState(true);
  const [smallBoxes, setSmallBoxes] = useState([]);
  const [locations, setLocations] = useState([""]);
  const [toastMessage, setToastMessage] = useState("");
  const [backColor, setBackColor] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { SubCategoryCreate } = useSelector(
    (state) => state?.SubCategoryCreate
  );

  const { SubCategoryUpdate } = useSelector(
    (state) => state?.SubCategoryUpdate
  );

  const { SubCategoryDelete } = useSelector(
    (state) => state?.SubCategoryDelete
  );

  console.log(SubCategoryDelete, "SubCategoryDeleteSubCategoryDelete");

  const { SubCategoryGetById } = useSelector(
    (state) => state?.SubCategoryGetById
  );
  console.log(SubCategoryUpdate, "SubCategoryUpdateSubCategoryUpdate");
  console.log(SubCategoryGetById, "SubCategoryGetByIdSubCategoryGetById");

  const dispatch = useDispatch();
  const formikRef = useRef();
  // console.log(SubCategoryCreate);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const smallBoxesString = smallBoxes.join(", ");
    console.log({ ...values, sub_category_name: smallBoxesString });
    if (changebtn === true) {
      const data1 = {
        data: { ...values, sub_category_name: smallBoxesString },
        method: "post",
        apiName: "createSubCategory",
      };

      dispatch(actions.SUBCATEGORYCREATE(data1));
      if (SubCategoryCreate?.data) {
        triggerToast("Successfully Created!");
        setBackColor("green");
      }else {
        triggerToast("failed");
        setBackColor("red")
      }
    }

    if (changebtn === false) {
      const data2 = {
        data: { ...values, sub_category_name: smallBoxesString },
        method: "put",
        apiName: `updateSubCategory/${apiUpdateId}`,
      };

      dispatch(actions.SUBCATEGORYUPDATE(data2));
      setchangebtn(true);
      if (SubCategoryUpdate?.data) {
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

  // Function to set default field values

  // const setmyDefaultFieldValues = (id) => {
  //   console.log(id, "edit id");
  //   const data = {
  //     data: {},
  //     method: "get",
  //     apiName: `getUserByIdSubCategory/${id}`,
  //   };
  //   dispatch(actions.SUBCATEGORYGETBYID(data));
  //   const { setFieldValue } = formikRef.current;
  //   if (setFieldValue) {
  //     setFieldValue("movie_id",SubCategoryGetById.data[0]?.movie_id);
  //     setFieldValue("category_id",SubCategoryGetById.data[0]?.category_id);
  //     setSmallBoxes([...SubCategoryGetById.data[0]?.sub_category_name.split(/[\s,]+/)]);
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
        `http://122.165.52.124:4000/api/v1/getUserByIdSubCategory/${id}`
      );
      const SubCategoryDataid = await response.data;
      console.log(SubCategoryDataid.data, "SubCategoryDataid"); // Assuming your API returns movie data

      const { setFieldValue } = formikRef.current;
      if (setFieldValue) {
        setFieldValue("movie_id", SubCategoryDataid.data?.movie_id);
        setFieldValue("category_id", SubCategoryDataid.data?.category_id);
        setSmallBoxes(SubCategoryDataid.data?.sub_category_name.split(","));
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

  /// dalete--------------------

  const handleDelete = (id) => {
    // console.log(id,"idididididididididi");
    // if (MovieDeleteId !== null) {
    const data = {
      data: {},
      method: "DELETE",
      apiName: `deleteSubCategory/${id}`,
    };
    dispatch(actions.SUBCATEGORYDELETE(data));
    if (SubCategoryDelete?.data) {
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

  const { SubCategoryTable } = useSelector((state) => state?.SubCategoryTable);

  useEffect(() => {
    const data1 = { data: {}, method: "get", apiName: "getDetailsSubCategory" };

    dispatch(actions.SUBCATEGORYTABLE(data1));
  }, [SubCategoryCreate, SubCategoryUpdate, SubCategoryDelete]);

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
        id: data?.sub_category_id,
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

  console.log(CategoryDropDown, "CategoryDropDownCategoryDropDown");

  const selectmovieIdfn = (name, id) => {
    console.log(name, "selectmovieIdfn");
    console.log(id, "selectmovieIdfn");

    const data1 = {
      data: { movie_id: id },
      method: "post",
      apiName: "dropdownCategory",
    };
    console.log(data1);
    dispatch(actions.CATEGORYDROPDOWN(data1));
  };

  // useEffect(() => {
  //   const data1 = { data: {}, method: "post", apiName: "dropdownCategory" };
  //   dispatch(actions.CATEGORYDROPDOWN(data1));
  // }, [dispatch]);

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
                  setmyDefaultFieldValues={setmyDefaultFieldValues}
                  handleDelete={handleDelete}
                  TableTittle="Subcategory"
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

export default SubcategoryTab;
