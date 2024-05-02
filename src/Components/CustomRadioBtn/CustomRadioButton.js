import React, { useState } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { InputLabel } from "@mui/material";

const CustomRadioButton = ({ selectedValue, customAllSubmit, inputHeading, options1 }) => {
  const handleChange = (event) => {
    customAllSubmit(event.target.value);
  };

  return (
    <div style={{width:"100%"}}>
      <InputLabel sx={{ fontSize: "14px", fontWeight: "700"}} htmlFor="Status">
      {inputHeading?inputHeading : "InputText"}
      </InputLabel>
      <RadioGroup
        aria-label="page"
        name="page"
        value={selectedValue}
        onChange={handleChange}
        style={{ display: "inline" }}
        
        
      >
        {options1.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio color="default" />}
            label={option.label}
            labelPlacement="end" // Aligns the label to the right of the radio button
            sx={{ "& .MuiFormControlLabel-label": { fontSize: "12.7px",fontWeight:"600"} }}
          />
        ))}
      </RadioGroup>
      {/* <Button variant="contained" color="primary" onClick={handleClick}>
        Select One
      </Button> */}
    </div>
  );
};

export default CustomRadioButton;
