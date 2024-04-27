import React, { useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import "../Pages/Css/ExpenseSheet.css";
import userIcon from "../Assets/wp5609640-broly-computer-wallpapers.jpg";
import CusTable from "../Components/CustomTable/CusTable";
import CustomInput from "../Components/CustomInput/CustomInput";
import CustomDropdownMui from "../Components/CustomDropDown/CustomDropdown";
import CustomSubmitButton from "../Components/CustomSubmitBtn/CustomSubmitButton";
import CustomCancelButton from "../Components/CustomCancelBtn/CustomCancelButton";

const ExpenseSheet = () => {
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
    <div className="expensesheet-div" style={{ height: "100%", width: "100%" }}>
      <Grid container md={12} sx={{ height: "100%" }}>
        <Grid
          item
          md={12}
          sx={{
            height: "12%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="pages-h1">
            <h1>Expense Sheet</h1>
          </div>
          <div className="d-flex align-items-end">
            <div className=" user-div d-flex ">
              <div className="username">Username </div>
              <div className="user-img-div">
                <img src={userIcon} alt="User" />
              </div>
            </div>
          </div>
        </Grid>
        {/* input field */}
        <Grid item md={12} sx={{ height: "43%" }}>
          <Container
            style={{
              width: "95%",
              backgroundColor: "white",
              padding: "15px 20px 10px",
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
                <CustomInput />
              </Grid>

              {/* Second Row */}
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                 
                  marginTop: "10px",
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
                  
                  marginTop: "10px",
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
                 
                  marginTop: "10px",
                }}
              >
                <CustomDropdownMui options={options} onSelect={handleSelect} />
              </Grid>

              {/* Third Row */}
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "start",
            
                  marginTop: "10px",
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
                 
                  marginTop: "10px",
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
              
                  marginTop: "10px",
                }}
              >
                <CustomInput />
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

        <Grid item md={12} sx={{ height: "45%" }}>
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

export default ExpenseSheet;
