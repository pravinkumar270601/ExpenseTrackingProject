import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import "./CustomPhoneNumber.css";

const CustomPhoneNumber = ({ label, name, ...rest }) => {
  const { values } = useFormikContext(); // Access form values
  const validatePhoneNumber = (value, country) => {
    let errorMessage;
    if (!value) {
      errorMessage = "Mobile Number is required";
    } else if (!/^\d+$/.test(value)) {
      errorMessage = "Mobile Number must contain only numbers";
    } else if (country === "") {
      errorMessage = "Country code is required";
    }
    return errorMessage;
  };
  const countryCodes = [
    
    { value: "+1", label: "+1" },
    { value: "+91", label: "+91 " },
    { value: "+44", label: "+44" },
    { value: "+86", label: "+86" },
  ];
  return (
    <div style={{ width: "85%" }}>
      <label htmlFor={name} className="input-heading">
        {label}
      </label>
      <div style={{ display: "flex", width: "100%" }}>
        <Field
          as="select"
          id={`${name}-country`}

          name={`${name}_country`}
          style={{ marginRight: "-2px" }}
          className="custom-country-field"
        >
          {countryCodes.map(({ value, label }, index) => (
            <option key={value} value={value} disabled={index === 0}>
              {label}
            </option>
          ))}
        </Field>
        <Field
        validate={(value) =>
          validatePhoneNumber(value, values[`${name}_country`])
        }
        maxLength="10"
          id={name}
          name={name}
          className="custom-phoneno-field"
          type="tel"
          placeholder="Enter Mobile Number"
          {...rest}
        />
      </div>
      <div style={{display:"flex"}}>
        
        <ErrorMessage
          name={`${name}_country`}
          component="div"
          className="inputs-error-msg"
        />
        <ErrorMessage
          name={name}
          component="div"
          className="inputs-error-msg"
        />
      </div>
    </div>
  );
};

export default CustomPhoneNumber;
