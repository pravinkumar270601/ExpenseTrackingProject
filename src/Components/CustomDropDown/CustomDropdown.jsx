// CustomDropdownMui.js
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./CustomDropdownMui.css";
import "../ComponentsCss/componet.css";
import { InputLabel } from "@mui/material";
import { Field, ErrorMessage } from "formik";

const CustomDropdownMui = ({ label, name, options, custPlaceholder, ...rest }) => {
  return (
    <div style={{ width: "85%" }}>
      {/* <InputLabel id="select-label" className="input-heading">
      {inputHeading?inputHeading : "InputText"}
      </InputLabel>
      <Select
        labelId="select-label"
        defaultValue=""
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Select option" }}
        className="customDropdown-input"
        sx={{ borderRadius: "12px", height: "37px", width: "100%",fontSize:"14px" }}
        
      >
        <MenuItem value="" disabled  >
          <div style={{ color: 'rgba(0, 0, 0, 0.3)',fontSize:"14px" }}>{selectplaceholder ? selectplaceholder :"Select dropddown"}</div>
        </MenuItem>

        {options.map((option) => (
          <MenuItem key={option.id} value={option.id} sx={{fontSize:"14px"}}>
            {option.value}
          </MenuItem>
        ))}
      </Select> */}

      <div>
        <label htmlFor={name} className="input-heading">{label}</label>
      </div>
      <Field as="select" id={name} name={name} {...rest} className="customDropdown-input">
        {custPlaceholder && (
          <option value="" disabled className="customDropdown-disabled-option">
            {custPlaceholder ? custPlaceholder :"Select dropddown"}
          </option>

        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

export default CustomDropdownMui;
