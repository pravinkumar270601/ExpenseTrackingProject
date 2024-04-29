import React, { useState } from "react";
import { InputLabel, colors } from "@mui/material";
import './CustomDateInput.css'

const CustomDateInput = ({ inputNavigate ,SelectInput}) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    // Call the callback function passed from the parent to navigate
    inputNavigate(event.target.value); // Assuming you want to navigate with the selected date
  };

  return (
    <div style={{ width: "85%" }}>
      <InputLabel
        htmlFor="movie-date"
        className="input-heading"
        sx={{ fontSize: "14px", fontWeight: "700" }}
      >
        {SelectInput}
      </InputLabel>
      <input
        type="date"
        id="movie-date"
        value={selectedDate}
        onChange={handleDateChange}
        className="customdateinput-field"
        style={{  paddingLeft: "15px",paddingRight: "10px", }}
        
        InputProps={{
            sx: {
              height: "37px",
              borderRadius: "10px",
              fontSize:"14px",
            
              width:"90%" ,
             
            
            },}}
      />
    </div>
  );
};

export default CustomDateInput;