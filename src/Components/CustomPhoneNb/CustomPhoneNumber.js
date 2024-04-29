import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./CustomPhoneNumber.css";

const CustomPhoneNumber = ({inputHeading}) => {
  const countries = [
    { code: "+91", name: "India" },
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
    // Add more countries as needed
  ];

  const [country, setCountry] = useState(); // Default country code

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  return (
    <div style={{ width: "85%" }} className="CustomPhoneNumber">
      <InputLabel
        htmlFor="phone"
        className="input-heading"
        sx={{ fontSize: "14px", fontWeight: "700" }}
      >
        {inputHeading?inputHeading : "InputText"}
      </InputLabel>
      <TextField
        autoComplete="off"
        id="phone"
        placeholder="Enter Mobile Number"
        variant="outlined"
        type="number"
        className="custom-phoneno-field"
        InputProps={{
          sx: {
            height: "37px",
            borderRadius: "12px",
            fontSize:"14px"
          },
          startAdornment: (
            <FormControl 
            
            >
              {/* <InputLabel id="country-label">Country Code</InputLabel> */}
              <Select
                labelId="country-label"
                id="country"
                value={country}
                className="phone-code-select"
                onChange={handleCountryChange}
                sx={{
                  marginLeft: "-15px",
                  
                }}
                
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code} sx={{ fontSize:"14px"}}>
                    {country.code}
                    {/* ({country.name}) */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ),
        }}
      />
    </div>
  );
};

export default CustomPhoneNumber;
