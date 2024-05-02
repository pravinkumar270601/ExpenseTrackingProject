// ------------------------------------
import React, { useEffect, useState } from "react";
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

function LocationInput({ customAllSubmit, inputHeading, locationplaceholder }) {
  const [locations, setLocations] = useState([""]);
  const [smallBoxes, setSmallBoxes] = useState([]);

  useEffect(()=>{
    const concatenatedLocations = smallBoxes.join(",");
    // console.log("Concatenated locations:", concatenatedLocations);
    customAllSubmit(concatenatedLocations)
    
  },[smallBoxes])
  

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
      // myonChange(smallBoxes)
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

  const handleSubmit = () => {
    const concatenatedLocations = smallBoxes.join(",");
    // console.log("Concatenated locations:", concatenatedLocations);
    setSmallBoxes([]);

    // You can do further processing here, like sending the data to a server or any other action.
  };

  const handleButtonClick = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const formattedDate = `${day}${months[monthIndex]}${year}`;
    // console.log("Formatted current date:", formattedDate);
  };

  return (
    <Grid item xs={12} style={{ width: "85%" }}>
      {locations.map((location, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={10}>
            <InputLabel
              htmlFor="movie-name"
              className="input-heading"
              sx={{ fontSize: "14px", fontWeight: "700" }}
            >
              {inputHeading ? inputHeading : "InputText"}
            </InputLabel>
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
                  marginTop: "47%",
                  borderRadius: "14px",
                  backgroundColor: "#4318FF",
                  color: "white",
                  height: "37px",
                  width: "40px",
                  padding: "8.5px",
                }}
              />
            </Grid>
          )}
        </Grid>
      ))}
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
            {/* <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveBox(index)}
              style={{ marginLeft: "5px" }}
            >
              <GiCancel  onClick={() => handleRemoveBox(index)}/>
            </Button > */}
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
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleSubmit();
          // handleButtonClick();
        }}
      >
        Submit
      </Button> */}
    </Grid>
  );
}

export default LocationInput;
