import React, { useState } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomDropdownMui from "../../Components/CustomDropDown/CustomDropdown";
import { Container, Grid } from "@mui/material";
import CusTable from "../../Components/CustomTable/CusTable";

const MovieTab = () => {
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
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        <Grid item md={12} sx={{ height: "35%" }}>
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
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <CustomInput sx={{ width: "100%" }} />
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <CustomInput sx={{ width: "100%" }} />
              </Grid>
              {/* {fourth Row} */}
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <button type="button" className="">
                  Primary
                </button>{" "}
                <button type="button" className="">
                  Primary
                </button>
              </Grid>
            </Grid>
          </Container>
        </Grid>

        <Grid item md={12} sx={{ height: "65%" }}>
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

export default MovieTab;
