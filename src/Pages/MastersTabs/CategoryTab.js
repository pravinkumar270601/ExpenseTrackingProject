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

const CategoryTab = () => {
 
  const [apiUpdateId,setapiUpdateId]=useState(null)

  const validationSchema = Yup.object().shape({
    movie_id: Yup.string().required('Movie Name is required'),
    // category_name: Yup.string().required('category name is required'),
   
  });

  const [changebtn, setchangebtn] = useState(true);
  const [smallBoxes, setSmallBoxes] = useState([]);
  const [locations, setLocations] = useState([""]);
  const [toastMessage, setToastMessage] = useState("");
  const [backColor, setBackColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { CategoryCreate } = useSelector((state) => state?.CategoryCreate);
  const { CategoryUpdate } = useSelector((state) => state?.CategoryUpdate);
  const { CategoryGetById } = useSelector((state) => state?.CategoryGetById);
  const { CategoryDelete } = useSelector((state) => state?.CategoryDelete);
  console.log(CategoryUpdate,"CategoryUpdateCategoryUpdate")

  console.log(CategoryGetById, "CategoryGetByIdCategoryGetById");

  const dispatch = useDispatch();
  const formikRef = useRef();
  console.log(CategoryCreate);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const smallBoxesString = smallBoxes.join(", ");
    console.log({ ...values, category_name: smallBoxesString });

    if (changebtn === true) {
      const data1 = {
        data: { ...values, category_name: smallBoxesString },
        method: "post",
        apiName: "createCategory",
      };
      dispatch(actions.CATEGORYCREATE(data1));
      if (CategoryCreate?.data) {
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
        data: { ...values, category_name: smallBoxesString },
        method: "put",
        apiName: `updateCategory/${apiUpdateId}`,
      };

      dispatch(actions.CATEGORYUPDATE(data2));
      setchangebtn(true);
      setchangebtn(true);
      if (CategoryUpdate?.data) {
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

  // const setmyDefaultFieldValues = (id) => {
  //   console.log(id, "edit id");
  //   const data = {
  //     data: {},
  //     method: "get",
  //     apiName: `getUserByIdCategory/${id}`,
  //   };
  //   dispatch(actions.CATEGORYGETBYID(data));
  //   console.log(
  //     CategoryGetById.data[0].category_id,
  //     "CategoryGetById.data.category_id"
  //   );
  //   const { setFieldValue } = formikRef.current;
  //   if (setFieldValue) {
  //     setFieldValue("movie_id", CategoryGetById.data[0]?.movie_id);
  //     setSmallBoxes([...CategoryGetById.data[0]?.category_name?.split(/[\s,]+/)]);
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
        `http://122.165.52.124:4000/api/v1/getUserByIdCategory/${id}`
      );
      const CategoryData = await response.data;
      console.log(CategoryData.data, "CategoryData"); // Assuming your API returns movie data

      const { setFieldValue } = formikRef.current;
      if (setFieldValue) {
            setFieldValue("movie_id", CategoryData.data[0]?.movie_id);
            setSmallBoxes(CategoryData.data[0]?.category_name?.split(","));
          }

      setchangebtn(false);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      // Handle error
    }
    setapiUpdateId(id)
  };

  const handleClearSmallBoxes = () => {
    setSmallBoxes([]);
    const newLocations = locations.map(() => "");
    setLocations(newLocations);
  };

  const handleDelete = (id) => {
    // console.log(id,"idididididididididi");
    // if (MovieDeleteId !== null) {
    const data = {
      data: {},
      method: "DELETE",
      apiName: `deleteCategory/${id}`,
    };
    dispatch(actions.CATEGORYDELETE(data));
    if (CategoryDelete?.data) {
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

  const { CategoryTableGetAll } = useSelector(
    (state) => state?.CategoryTableGetAll
  );
  // console.log(CategoryTableGetAll, "categoryTableGetAll................");



  useEffect(() => {
    const data1 = { data: {}, method: "get", apiName: "getDetailsCategory" };
    // console.log("Dispatching CATEGORY action:", data1);
    dispatch(actions.CATEGORYTABLEGETALL(data1));
    // console.log(data1, "CATEGORY.................");
  }, [CategoryCreate,CategoryUpdate,CategoryDelete]);

  const [rowTableData, setRowTableData] = useState([
    {
      Sno: "1",
      MovieName: "--",
      Category: "--",
      CreatedDate: "--",
    },
  ]);

  useEffect(() => {
    const tempArr1 = [];
    // console.log(CategoryTableGetAll.data, "ccccccccccccccccc");

    CategoryTableGetAll?.data?.map((data, index) => {
      return tempArr1.push({
        id: data?.category_id,
        Sno: index + 1,
        MovieName: data.movie_name,
        Category: data.category_name,

        CreatedDate: data.created_on,
      });
    });
    setRowTableData(tempArr1);
  }, [CategoryTableGetAll]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        <Grid item md={12} sx={{ height: "37%" }}>
          <Formik
            initialValues={{
              movie_id: "",
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
                    padding: "10px 20px",
                    borderRadius: "15px",
                    height: "100%",
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
                        inputHeading={"Category"}
                        locationplaceholder={"Enter Category"}
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
                  TableHeading={MASTER.CategoryTableHeaders}
                  Tabledata={rowTableData}
                  setmyDefaultFieldValues={setmyDefaultFieldValues}
                  handleDelete={handleDelete}
                  TableTittle="Category"
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

export default CategoryTab;
