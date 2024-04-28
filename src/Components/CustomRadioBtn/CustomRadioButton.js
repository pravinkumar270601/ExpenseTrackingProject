import React, { useState } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { InputLabel } from "@mui/material";

const CustomRadioButton = ({ options1, radioNavigate }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    // Call the onNavigate function passed from the parent to navigate
    radioNavigate(value);
  };

  return (
    <div style={{width:"85%"}}>
      <InputLabel sx={{ fontSize: "14px", fontWeight: "700"}} htmlFor="Status">
        Status
      </InputLabel>
      <RadioGroup
        aria-label="page"
        name="page"
        value={value}
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
