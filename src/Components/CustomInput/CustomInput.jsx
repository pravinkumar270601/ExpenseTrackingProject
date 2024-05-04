import React, { useState } from "react";
import "./CustomInput.css";
import "../ComponentsCss/componet.css";
import { Field, ErrorMessage } from "formik";

const CustomInput = ({ label, name,custPlaceholder, ...rest }) => {
  return (
    <div style={{ width: "85%" }}>
      {/* <InputLabel
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
      /> */}

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
          type="text"
          placeholder={`${custPlaceholder?custPlaceholder:"Enter Input"}`}
          {...rest}
          className='custominput-field'
         
        />
        <ErrorMessage name={name} component="div" />
      </div>
    </div>
  );
};

export default CustomInput;
