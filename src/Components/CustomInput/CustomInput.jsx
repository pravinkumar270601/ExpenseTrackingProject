import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./CustomInput.css";
import "../ComponentsCss/componet.css";
import { InputLabel } from "@mui/material";

const CustomInput = ({ value, customAllSubmit, inputHeading, inputPlaceholder }) => {
  const handleChange = (event) => {
    customAllSubmit(event.target.value);
  };

  // const handleClick = () => {
  //   // Call the callback function passed from the parent to navigate
  //   inputNavigate(value);
  //   setValue("");
  //   console.log("hii", value);
  // };

  return (
    <div style={{width:"85%"}}>
      <InputLabel
        htmlFor="movie-name"
        className="input-heading"
        sx={{ fontSize: "14px", fontWeight: "700" }}
      >
       {inputHeading?inputHeading : "InputText"}
      </InputLabel>
      <TextField
        autoComplete="off"
        type="text"
        id="movie-name"
        placeholder={`${inputPlaceholder?inputPlaceholder:"Enter Input"}`}
        variant="outlined"
        value={value}
        className="custominput-field"
        onChange={handleChange}
        InputProps={{
          sx: {
            height: "37px",
            borderRadius: "12px",
            fontSize:"14px"
            // width:"90%" ,
          },
        }}
      />
      {/* <Button variant="contained" color="primary" onClick={handleClick}>
        Go to Target Page
      </Button> */}
    </div>
  );
};

export default CustomInput;
