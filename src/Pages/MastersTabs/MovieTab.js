import React, { useState, useEffect, useRef } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { Container, Grid } from "@mui/material";
import CusTable from "../../Components/CustomTable/CusTable";
import CustomRadioButton from "../../Components/CustomRadioBtn/CustomRadioButton";
import * as MASTER from "../../DataEntries/Master/MasterEntries";
import actions from "../../ReduxStore/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toast from "../../Components/Toast/Toaste";

const MovieTab = () => {
  const [apiUpdateId,setapiUpdateId]=useState(null)
  const validationSchema = Yup.object().shape({
    movie_name: Yup.string().required("Movie name is required *"),
    active_status: Yup.string().required("Status is required *"),
  });

  const [changebtn, setchangebtn] = useState(true);
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [toastMessage, setToastMessage] = useState("");
  const [backColor, setBackColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { MovieCreate } = useSelector((state) => state?.MovieCreate);
  const { MovieUpdate } = useSelector((state) => state?.MovieUpdate);
  const { MovieDelete } = useSelector((state) => state?.MovieDelete);
  const { MovieGetById } = useSelector((state) => state?.MovieGetById);

  console.log(MovieGetById.data, "MovieGetById.dataMovieGetById.data");

  // console.log(MovieUpdate, "MovieCreateMovieCreateMovieCreate");

  console.log(MovieCreate, "MovieCreateMovieCreateMovieCreate");
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission
    console.log(values);
    if (changebtn === true) {
      const data1 = {
        data: { ...values },
        method: "post",
        apiName: "createMovie",
      };

      dispatch(actions.MOVIECREATE(data1));
      const data = { data: {}, method: "get", apiName: "getmovieDetails" };
      dispatch(actions.MOVIESTABLEGETALL(data));
      if (MovieCreate?.data) {
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
        data: { ...values },
        method: "put",
        apiName: `updateMovie/${apiUpdateId}`,
      };

      dispatch(actions.MOVIEUPDATE(data2));
      setchangebtn(true);
      if (MovieUpdate?.data) {
        triggerToast("Successfully Updated");
        setBackColor("green")
      } else {
        triggerToast("failed");
        setBackColor("red")
      }

      // const data = { data: {}, method: "get", apiName: "getmovieDetails" };
      // dispatch(actions.MOVIESTABLEGETALL(data));
    }

    // console.log("Dispatching MOVIESTABLEGETALL action:", data);

    // Reset the form
    resetForm();
    setSubmitting(false);
  };

  const triggerToast = (message) => {
    console.log(message, "toast work successfully");
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Toast will disappear after 3 seconds
  };

  // Function to set default field values

  // const setmyDefaultFieldValues = (id) => {
  //   console.log(id, "edit id");
  //   const data = { data: {}, method: "get", apiName: `getmovieById/${id}` };
  //   dispatch(actions.MOVIEGetById(data));
  //   const { setFieldValue } = formikRef.current;
  //   if (setFieldValue) {
  //     setFieldValue("movie_name", MovieGetById.data.movie_name);
  //     setFieldValue("active_status", `${MovieGetById.data.active_status}`);
  //   }
  //   setchangebtn(false);
  // };

  const setmyDefaultFieldValues = async (id) => {
    console.log(id, "edit id");

    try {
      const response = await axios.get(
        `http://122.165.52.124:4000/api/v1/getmovieById/${id}`
      );
      const movieDataid = await response.data;
      console.log(movieDataid.data, "movieDatamovieDatamovieData"); // Assuming your API returns movie data

      const { setFieldValue } = formikRef.current;
      if (setFieldValue) {
        setFieldValue("movie_name", movieDataid.data.movie_name);
        setFieldValue("active_status", `${movieDataid.data.active_status}`);
      }

      setchangebtn(false);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      // Handle error
    }
    setapiUpdateId(id)
  };

  /// dalete--------------------

  const handleDelete = (id) => {
    // console.log(id,"idididididididididi");
    // if (MovieDeleteId !== null) {
    const data = {
      data: {},
      method: "DELETE",
      apiName: `deleteMovie/${id}`,
    };
    dispatch(actions.MOVIEDELETE(data));

    const data1 = { data: {}, method: "get", apiName: "getmovieDetails" };
    dispatch(actions.MOVIESTABLEGETALL(data1));
    if (MovieDelete?.data) {
      triggerToast("Successfully Deleted!");
      setBackColor("green")
    } else {
      triggerToast("failed");
      setBackColor("red")
    }
  };

  // --------------------------------------------

  const { MoviesTableGetAll } = useSelector(
    (state) => state?.MoviesTableGetAll
  );
  // console.log(MoviesTableGetAll, "lllllllll");

  useEffect(() => {
    const data = { data: {}, method: "get", apiName: "getmovieDetails" };
    // console.log("Dispatching MOVIESTABLEGETALL action:", data);
    dispatch(actions.MOVIESTABLEGETALL(data));
    // console.log(data, "MOVIESTABLEGETALL.................");
  }, [MovieCreate, MovieUpdate, MovieDelete]);

  const [rowTableData2, setRowTableData2] = useState([
    {
      Sno: "1",
      MovieName: "--",
      Staus: "--",
      Date: "--",
    },
  ]);
  // function getMonthName(monthIndex) {
  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   return months[monthIndex];
  // }
  useEffect(() => {
    const tempArr = [];
    MoviesTableGetAll?.data?.map((data, index) => {
      // const currentDate = new Date();
      // const formattedDate = `${currentDate.getDate()} ${getMonthName(
      //   currentDate.getMonth()
      // )} ${currentDate.getFullYear()}`;
      return tempArr.push({
        id: data?.movie_id,
        Sno: index + 1,
        MovieName: data.movie_name,
        Status: data.status,
        Date: data.created_on,
      });
    });
    setRowTableData2(tempArr);
  }, [MoviesTableGetAll]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        <Grid item md={12} sx={{ height: "37%" }}>
          <Formik
            initialValues={{
              movie_name: "",
              active_status: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
          >
            {({ isSubmitting, resetForm }) => (
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
                      <CustomInput
                        label="Movie Name"
                        name="movie_name"
                        custPlaceholder="Enter Movie Name"
                        inputType={"text"}
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
                      <CustomRadioButton
                        label="Status"
                        name="active_status"
                        options={[
                          { value: "1", label: "Active" },
                          { value: "0", label: "Inactive" },
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
                          // onClick={() => setDefaultFieldValues(setFieldValue)}
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
                  TableHeading={MASTER.MovieTableHeaders}
                  Tabledata={rowTableData2}
                  TableTittle="Movies"
                  setmyDefaultFieldValues={setmyDefaultFieldValues}
                  handleDelete={handleDelete}
                  // handleDeleteIdChange={handleDeleteIdChange}
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

export default MovieTab;
