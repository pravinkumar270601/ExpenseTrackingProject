import React from "react";
import { Field, ErrorMessage } from "formik";
import "./CustomRadioButton.css";
import "../ComponentsCss/componet.css";

const CustomRadioButton = ({ label, name, options, ...rest }) => {
  return (
    <div style={{ width: "100%" }}>

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
      <ErrorMessage name={name} component="div" className="inputs-error-msg" />
    </div>
  );
};

export default CustomRadioButton;
