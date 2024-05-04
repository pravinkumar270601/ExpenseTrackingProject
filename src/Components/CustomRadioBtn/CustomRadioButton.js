import React from "react";
import { Field, ErrorMessage } from "formik";
import "./CustomRadioButton.css";
import "../ComponentsCss/componet.css";

const CustomRadioButton = ({ label, name, options, ...rest }) => {
  return (
    <div style={{ width: "100%" }}>
      {/* <InputLabel sx={{ fontSize: "14px", fontWeight: "700" }} htmlFor="Status">
        {inputHeading ? inputHeading : "InputText"}
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
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "12.7px",
                fontWeight: "600",
              },
            }}
          />
        ))}
      </RadioGroup> */}
      <label
      className="input-heading"
      >{label}</label>
      <div role="group" aria-labelledby={name} className="cust-radio-div">
        {options.map((option) => (
          <label key={option.value} className="radio-label">
            <Field type="radio" name={name} value={option.value} {...rest} className="radio-input" />
            {option.label}
          </label>
        ))}
      </div>
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

export default CustomRadioButton;
