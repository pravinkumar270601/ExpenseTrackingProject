import React from "react";
import { Container, Grid, TextField } from "@mui/material";
import "../Pages/Css/ExpenseSheet.css";
import userIcon from "../Assets/wp5609640-broly-computer-wallpapers.jpg";
import { Button } from "@mui/base";
import CusTable from "../Components/CustomTable/CusTable";
import CustomInput from "../Components/CustomInput/CustomInput";

const ExpenseSheet = () => {
  return (
    <div className="expensesheet-div">
      <Grid container md={12} sx={{ height: "100%" }}>
        <Grid
          item
          md={12}
          sx={{
            height: "13%",
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
        <Grid item md={12} sx={{ height: "37%" }}>
          <Container
            style={{
              width: "90%",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Grid container >
              {/* First Row */}
              <Grid item xs={4}>
              <CustomInput/> 
              </Grid>
              <Grid item xs={4}>
              <CustomInput/> 
              </Grid>
              <Grid item xs={4}>
              <CustomInput/> 
              </Grid>

              {/* Second Row */}
              <Grid item xs={4}>
              <CustomInput/> 
              </Grid>
              <Grid item xs={4}>
              <CustomInput/> 
              </Grid>
              <Grid item xs={4}>
              <CustomInput/> 
              </Grid>

              {/* Third Row */}
              <Grid item xs={4}>
              <CustomInput/> 
              </Grid>
              <Grid item xs={4}>
              <CustomInput/> 
              </Grid>
              <Grid item xs={4}>
              <CustomInput/> 
              </Grid>
              {/* {fourth Row} */}
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Button>submit</Button> <Button>cancel</Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>

        <Grid item md={12} sx={{ height: "50%" }}>
          <Container
            style={{
              width: "90%",
              padding: "0px",
              // borderRadius: "10px",
              marginTop:"15px"
              
            }}
          >
            <Grid container >
              <Grid item xs={12}>
                <CusTable/>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExpenseSheet;
