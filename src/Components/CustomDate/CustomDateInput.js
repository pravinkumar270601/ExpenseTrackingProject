import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import { CiCalendar } from "react-icons/ci";
import "./CustomDateInput.css";
import "../ComponentsCss/componet.css";

const CustomDateInput = ({ label, name, ...rest }) => {
  const handleIconClick = () => {
    document.getElementById(name).click();
  };

  return (
    <div style={{ width: "85%" }} className="CustomDateInput-div">
      <label htmlFor={name}
      className="input-heading"
      >{label}</label>
      <div style={{ position: "relative", width: "100%" }}>
        <Field name={name} style={{ width: "100%",  }}>
          {({ field, form }) => (
            <DatePicker
              {...field}
              {...rest}
              id={name} // Assign id to the date field
              selected={field.value}
              className="customdateinput-field"
              onChange={(date) => form.setFieldValue(field.name, date)}
              placeholderText={"Select date"} 
            />
          )}
        </Field>
        <CiCalendar
          style={{
            position: "absolute",
            fontSize:"21px",
            // right: '10px',
            cursor: "pointer",
            right: "18px",
            top: "50%",
            transform: "translate(50%, -50%)",
          }}
          onClick={handleIconClick} // Handle click event on the calendar icon
        />
      </div>
      <ErrorMessage name={name} component="div" className="inputs-error-msg" />
    </div>
  );
};

export default CustomDateInput;
