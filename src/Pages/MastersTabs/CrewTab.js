import React, { useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import "../../Pages/Css/ExpenseSheet.css";
import CustomDropdownMui from "../../Components/CustomDropDown/CustomDropdown";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomCancelButton from "../../Components/CustomCancelBtn/CustomCancelButton";
import CustomSubmitButton from "../../Components/CustomSubmitBtn/CustomSubmitButton";
import CusTable from "../../Components/CustomTable/CusTable";
import CustomRadioButton from "../../Components/CustomRadioBtn/CustomRadioButton";

const CrewTab = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
    { id: 3, value: "Option 3" },
  ];

  const handleSelect = (id) => {
    setSelectedOption(id);
    console.log("Selected option id:", id);
    // Do something with the selected option
  };

  const radionavigateToPage = (page) => {
    // Perform navigation to the selected page
    console.log(`Navigating to ${page}`);
    // Your navigation logic here
  };

  const options1 = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    // { label: "Page 3", value: "3" },
  ];

  return (
    <div className="expensesheet-div" style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        {/* input field */}
        <Grid item md={12} sx={{ height: "43%" }}>
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
                <CustomDropdownMui options={options} onSelect={handleSelect} />
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
                <CustomDropdownMui options={options} onSelect={handleSelect} />
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
                <CustomDropdownMui options={options} onSelect={handleSelect} />
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
                <CustomDropdownMui options={options} onSelect={handleSelect} />
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
                <CustomInput />
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
                  options1={options1}
                  radioNavigate={radionavigateToPage}
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
                <CustomInput />
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
                <CustomInput />
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
                <CustomSubmitButton />{" "}
                <CustomCancelButton>Cancel</CustomCancelButton>
              </Grid>
            </Grid>
          </Container>
        </Grid>

        <Grid item md={12} sx={{ height: "52%" }}>
          <Container
            style={{
              width: "95%",
              padding: "0px",
              // borderRadius: "10px",
              marginTop: "5px",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <CusTable />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default CrewTab;
