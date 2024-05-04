import React, { useState, useEffect } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { Container, Grid } from "@mui/material";
import CusTable from "../../Components/CustomTable/CusTable";
import CustomRadioButton from "../../Components/CustomRadioBtn/CustomRadioButton";
import * as MASTER from "../../DataEntries/Master/MasterEntries";
import actions from "../../ReduxStore/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";

const MovieTab = () => {
  const dispatch = useDispatch();

  const { MovieCreate } = useSelector(
    (state) => state?.MovieCreate
  );

  // console.log(MovieCreate,"MovieCreateMovieCreateMovieCreate")
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission
    console.log(values)
    
      const data1 = {
        data: values,
        method: "post",
        apiName: "createMovie",
      };
     
    dispatch(actions.MOVIECREATE(data1));
    const data = { data: {}, method: "get", apiName: "getmovieDetails" };
    // console.log("Dispatching MOVIESTABLEGETALL action:", data);
    dispatch(actions.MOVIESTABLEGETALL(data));

    // Reset the form
    resetForm();
    setSubmitting(false);

  };
  // Function to set default field values
  const setDefaultFieldValues = (setFieldValue) => {
    setFieldValue("movie_name", "John");
    setFieldValue("active_status", "1");
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
  }, [dispatch]);

  const [rowTableData2, setRowTableData2] = useState([
    {
      Sno: "1",
      MovieName: "--",
      Staus: "--",
      Date: "--",
    },
  ]);
  function getMonthName(monthIndex) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  }
  useEffect(() => {
    const tempArr = [];
    MoviesTableGetAll?.data?.map((data, index) => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()} ${getMonthName(
        currentDate.getMonth()
      )} ${currentDate.getFullYear()}`;
      return tempArr.push({
        // id: data?.company_id
        Sno: index + 1,
        MovieName: data.movie_name,
        Staus: data.active_status === 1 ? "Active" : "Inactive",
        Date: formattedDate,
      });
    });
    setRowTableData2(tempArr);
  }, [MoviesTableGetAll,dispatch]);

  // console.log(rowTableData2, "rowTableData2................................");

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        <Grid item md={12} sx={{ height: "37%" }}>
          <Formik
            initialValues={{
              movie_name: "",
              active_status: "",
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
                      <CustomInput
                        label="Movie Name"
                        name="movie_name"
                        custPlaceholder="Enter Movie Name"
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
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default MovieTab;
