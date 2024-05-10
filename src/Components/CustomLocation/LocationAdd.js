// ------------------------------------
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./LocationAdd.css";
import { GiCancel } from "react-icons/gi";
import { InputLabel } from "@mui/material";
import CustomInput from "../CustomInput/CustomInput";
import "../CustomInput/CustomInput.css";
import "../ComponentsCss/componet.css";
import { MdCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

function LocationInput({
  inputHeading,
  locationplaceholder,
  smallBoxes,
  setSmallBoxes,
  locations,
  setLocations,
  errorMessage,
}) {
  const handleChangeLacation = (index, value) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
    // console.log(newLocations, "//////////");
  };

  const handleAddLocation = () => {
    const lastLocation = locations[locations.length - 1];
    if (lastLocation.trim() !== "") {
      setSmallBoxes([...smallBoxes, lastLocation]);
      // Clear the input field
      const newLocations = [...locations];
      newLocations[locations.length - 1] = ""; // Reset the last location to an empty string
      setLocations(newLocations);
    }
  };

  const handleRemoveBox = (index) => {
    const newSmallBoxes = [...smallBoxes];
    newSmallBoxes.splice(index, 1);
    setSmallBoxes(newSmallBoxes);
  };

  return (
    <Grid item xs={12} style={{ width: "85%" }}>
      {locations.map((location, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={10}>
            <label htmlFor="movie-name" className="input-heading">
              {inputHeading ? inputHeading : "InputText"}
            </label>
            <TextField
              autoComplete="off"
              type="text"
              id="movie-name"
              placeholder={`${
                locationplaceholder ? locationplaceholder : "Enter Adding"
              }`}
              variant="outlined"
              value={location}
              className="custominput-field"
              onChange={(e) => handleChangeLacation(index, e.target.value)}
              InputProps={{
                sx: {
                  height: "37px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  // width:"290px"
                  width: "100%",
                },
              }}
            />
          </Grid>
          {index === locations.length - 1 && (
            <Grid item xs={2}>
              <FaPlus
                type="button"
                onClick={handleAddLocation}
                style={{
                  marginTop: "24px",
                  borderRadius: "14px",
                  backgroundColor: "#4318FF",
                  color: "white",
                  height: "37px",
                  width: "37px",
                  padding: "8.5px",
                }}
              />
            </Grid>
          )}
        </Grid>
      ))}
      {!smallBoxes.length &&
        errorMessage && ( // Show error message if no small boxes and there's an error message present
          <div style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>
            {errorMessage}
          </div>
        )}
      <div
        style={{ marginTop: "10px", alignItems: "center" }}
        className="small-boxes-container"
      >
        {smallBoxes.map((box, index) => (
          <div
            key={index}
            style={{
              display: "inline-block",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              padding: "3px",
              marginRight: "5px",
              marginBottom: "5px",
              borderRadius: "12px",
              fontSize: "14px",
              //   height:"30px"
            }}
          >
            {box}

            <MdCancel
              onClick={() => handleRemoveBox(index)}
              style={{
                marginLeft: "5px",
                color: "#4318FF",
                marginBottom: "2px",
                fontSize: "20px",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </div>
    </Grid>
  );
}

export default LocationInput;
