// CustomDropdownMui.js
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./CustomDropdownMui.css";
import "../ComponentsCss/componet.css";
import { InputLabel } from "@mui/material";
import { Field, ErrorMessage } from "formik";

const CustomDropdownMui = ({
  label,
  name,
  options,
  custPlaceholder,
  setFieldValue,
  selectmovieIdfn,
  selectCategoryIdfn,
  ...rest
}) => {
  return (
    <div style={{ width: "85%" }}>
      <div>
        <label htmlFor={name} className="input-heading">
          {label}
        </label>
      </div>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className="customDropdown-input"
        // onChange={(e) => {
        //   form.setFieldValue(name, e.target.value);
        // }}
        onChange={(e) => {
          // Use the setFieldValue passed from props
          setFieldValue(name, e.target.value);
          // Log the selected value
          console.log(name,e.target.value);

          if (selectmovieIdfn) {
            selectmovieIdfn(name,e.target.value)

          }
          if (selectCategoryIdfn) {
            selectCategoryIdfn(name,e.target.value)

          }


        }}
      >
        {custPlaceholder && (
          <option value="" disabled className="customDropdown-disabled-option">
            {custPlaceholder ? custPlaceholder : "Select dropddown"}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className="inputs-error-msg" />
    </div>
  );
};

export default CustomDropdownMui;
