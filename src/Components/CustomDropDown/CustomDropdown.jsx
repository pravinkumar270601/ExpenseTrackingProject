// CustomDropdownMui.js
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./CustomDropdownMui.css";
import "../ComponentsCss/componet.css";
import { InputLabel } from "@mui/material";

const CustomDropdownMui = ({ options, onSelect }) => {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div style={{width:"85%"}}>
      <InputLabel id="select-label" className="input-heading">
        Movie Name
      </InputLabel>
      <Select
        labelId="select-label"
        defaultValue=""
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Select option" }}
        className="customDropdown-input"
        sx={{ borderRadius: "12px", height: "37px", width: "100%",fontSize:"14px" }}
        
      >
        <MenuItem value="" disabled  >
          <div style={{ color: 'rgba(0, 0, 0, 0.3)',fontSize:"14px" }}>Select an option</div>
        </MenuItem>

        {options.map((option) => (
          <MenuItem key={option.id} value={option.id} sx={{fontSize:"14px"}}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomDropdownMui;
