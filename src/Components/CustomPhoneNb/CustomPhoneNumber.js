import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./CustomPhoneNumber.css";

const CustomPhoneNumber = ({ value, customAllSubmit, inputHeading }) => {
  const countries = [
    { code: "+91", name: "India" },
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
    // Add more countries as needed
  ];

  const [country, setCountry] = useState(); // Default country code
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    customAllSubmit(event.target.value); // Pass the phone number value to the parent component
  };

  return (
    <div style={{ width: "85%" }} className="CustomPhoneNumber">
      <InputLabel
        htmlFor="phone"
        className="input-heading"
        sx={{ fontSize: "14px", fontWeight: "700" }}
      >
        {inputHeading ? inputHeading : "InputText"}
      </InputLabel>
      <TextField
        autoComplete="off"
        id="phone"
        placeholder="Enter Mobile Number"
        variant="outlined"
        type="number"
        value={value}
        className="custom-phoneno-field"
        onChange={handlePhoneNumberChange}
        InputProps={{
          sx: {
            height: "37px",
            borderRadius: "12px",
            fontSize: "14px",
          },
          startAdornment: (
            <FormControl>
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
                style={{
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                  fontSize: "14px",
                }}
              >
                {countries.map((country) => (
                  <MenuItem
                    key={country.code}
                    value={country.code}
                    sx={{ fontSize: "14px" }}
                  >
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
