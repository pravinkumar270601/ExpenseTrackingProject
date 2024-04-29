import React from "react";
import Button from "@mui/material/Button";
import { capitalize } from "@mui/material";

const CustomSubmitButton = ({ onClick, formData1 }) => {
  const handleSubmit = () => {
    // Store or process form data here using the provided onClick function
    onClick(formData1);
  };

  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "var(--primary-color)",borderRadius:"12px",height:"37px",width:"130px",fontSize:"12px",marginRight:"5px",textTransform: "none" }}
      onClick={handleSubmit}
    >
      Submit
    </Button>
  );
};

export default CustomSubmitButton;
