import React, { useState } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomDropdownMui from "../../Components/CustomDropDown/CustomDropdown";
import { Container, Grid } from "@mui/material";
import CusTable from "../../Components/CustomTable/CusTable";
import CustomSubmitButton from "../../Components/CustomSubmitBtn/CustomSubmitButton";
import CustomCancelButton from "../../Components/CustomCancelBtn/CustomCancelButton";
import CustomRadioButton from "../../Components/CustomRadioBtn/CustomRadioButton";
import LocationInput from "../../Components/CustomLocation/LocationAdd";

const SubcategoryTab = () => {
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
                <CustomDropdownMui options={options} onSelect={handleSelect} />
              </Grid>
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
                  justifyContent: "end",
                  marginTop: "5px",
                }}
              >
                <LocationInput />
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
                <CustomSubmitButton />{" "}
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
                <CusTable />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default SubcategoryTab;
