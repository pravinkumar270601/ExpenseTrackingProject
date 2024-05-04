import React from "react";
import { Field, ErrorMessage } from "formik";
import "./CustomPhoneNumber.css";

const CustomPhoneNumber = ({ label, name, ...rest }) => {

  const countryCodes = [
    { value: "Nan", label: "  " },
    { value: " ", label: " " },
    { value: "+91", label: "+91 " },
  ];
  return (
    <div style={{ width: "85%" }}>
      <label htmlFor={name}
      className="input-heading"
      >{label}</label>
      <div style={{ display: "flex",width:"100%" }}>
        <Field
          as="select"
          id={`${name}-country`}
          name={`${name}_country`}
          style={{ marginRight: "-2px" }}
          className='custom-country-field'
        >
          {countryCodes.map(({ value, label }, index) => (
            <option key={value} value={value} disabled={index === 0}>
              {label}
            </option>
          ))}
        </Field>
        <Field
          id={name}
          name={name}
          className='custom-phoneno-field'
          type="tel"
          placeholder="Enter Mobile Number"
          {...rest}
        />
      </div>
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

export default CustomPhoneNumber;
