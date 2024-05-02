import React, { useState } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomDropdownMui from "../../Components/CustomDropDown/CustomDropdown";
import { Container, Grid } from "@mui/material";
import CusTable from "../../Components/CustomTable/CusTable";
import CustomSubmitButton from "../../Components/CustomSubmitBtn/CustomSubmitButton";
import CustomCancelButton from "../../Components/CustomCancelBtn/CustomCancelButton";
import CustomRadioButton from "../../Components/CustomRadioBtn/CustomRadioButton";
import CustomPhoneNumber from "../../Components/CustomPhoneNb/CustomPhoneNumber";
import * as MASTER from "../../DataEntries/Master/MasterEntries";

const MovieTab = () => {
  const [formData, setFormData] = useState({
    input: "",
    radio: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
    setFormData({
    input: "",
    radio: "",
    dropdown: ""
  })
  };
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

  const options1 = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    // { label: "Page 3", value: "3" },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        <Grid item md={12} sx={{ height: "37%" }}>
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
                  value={formData.input}
                  customAllSubmit={(value) => handleChange("input", value)}
                  inputHeading="Custom Input"
                  inputPlaceholder="Enter Input"
                />

                {/* <CustomInput inputNavigate={inputTargetPage} sx={{ width: "100%" }} inputHeading={"Movie Name"} inputPlaceholder={"Enter Movie Name"}/> */}
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
                  selectedValue={formData.radio}
                  customAllSubmit={(value) => handleChange("radio", value)}
                  inputHeading="Status"
                  options1={options1}
                />
                {/* <CustomRadioButton
                  options1={options1}
                  radioNavigate={radionavigateToPage}
                  inputHeading={"Status"}
                /> */}
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
                <CustomSubmitButton onClick={handleSubmit} />{" "}
                <CustomCancelButton>Cancel</CustomCancelButton>
              </Grid>
            </Grid>
          </Container>
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
                  TableHeading={MASTER.MovieTableHeaders}
                  Tabledata={MASTER.MovieTableVaues}
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
