import React, { useState } from "react";
import "./CustomInput.css";
import "../ComponentsCss/componet.css";
import { Field, ErrorMessage } from "formik";

const CustomInput = ({ label, name,custPlaceholder,inputType, ...rest }) => {
  const validateInput = (value) => {
    let error;
    if (!value) {
      error =` Field is ${inputType === "text" ? "Required" : "Required"}`;
    } else if (inputType === "number" && isNaN(value)) {
      error = "Field is Required";
    
    }
    return error;
  };
  return (
    <div style={{ width: "85%" }}>
      <div style={{ width: "100%" }}>
        <div>
          <label
            htmlFor={name}
            className="input-heading"
            style={{ fontSize: "14px", fontWeight: "700" }}
          >
            {label}
          </label>
        </div>
        <Field
          id={name}
          name={name}
          type={inputType}
          placeholder={`${custPlaceholder?custPlaceholder:"Enter Input"}`}
          {...rest}
          className='custominput-field'
          validate={validateInput}
         
        />
        <ErrorMessage name={name} component="div" className="inputs-error-msg" />
      </div>
    </div>
  );
};

export default CustomInput;
