import React, { useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import "../../Pages/Css/ExpenseSheet.css";
import CustomDropdownMui from "../../Components/CustomDropDown/CustomDropdown";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomCancelButton from "../../Components/CustomCancelBtn/CustomCancelButton";
import CustomSubmitButton from "../../Components/CustomSubmitBtn/CustomSubmitButton";
import CusTable from "../../Components/CustomTable/CusTable";
import CustomRadioButton from "../../Components/CustomRadioBtn/CustomRadioButton";
import CustomPhoneNumber from "../../Components/CustomPhoneNb/CustomPhoneNumber";
import * as MASTER from "../../DataEntries/Master/MasterEntries";

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
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Others", value: "Others" },
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
                <CustomDropdownMui
                  options={options}
                  onSelect={handleSelect}
                  inputHeading={"Movie Name"}
                  selectplaceholder={"Select Movie"}
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
                  options={options}
                  onSelect={handleSelect}
                  inputHeading={"Location"}
                  selectplaceholder={"Select Location"}
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
                  options={options}
                  onSelect={handleSelect}
                  inputHeading={"Category"}
                  selectplaceholder={"Select Category"}
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
                  options={options}
                  onSelect={handleSelect}
                  inputHeading={"Subcategory"}
                  selectplaceholder={"Select Subcategory"}
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
                  inputHeading={"Crew Name"}
                  inputPlaceholder={"Enter Crew Name"}
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
                  options1={options1}
                  radioNavigate={radionavigateToPage}
                  inputHeading={"Gender"}
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
                <CustomPhoneNumber inputHeading={"Mobile Number"} />
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
                  inputHeading={"Natioanlity"}
                  inputPlaceholder={"Enter Natioanlity"}
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
                <CustomSubmitButton />{" "}
                <CustomCancelButton>Cancel</CustomCancelButton>
              </Grid>
            </Grid>
          </Container>
        </Grid>

        <Grid item md={12} sx={{ height: "51%" }}>
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
                <CusTable
                  TableHeading={MASTER.CrewTableHeaders}
                  Tabledata={MASTER.CrewTableVaues}
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
