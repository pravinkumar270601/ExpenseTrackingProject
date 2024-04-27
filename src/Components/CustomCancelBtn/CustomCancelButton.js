// CustomCancelButton.js

import React from 'react';
import Button from '@mui/material/Button';

const CustomCancelButton = ({ onClick, children, ...props }) => {
  return (
    <Button 
      variant="outlined" 
      sx={{backgroundColor:"#F4F7FE", width:'150px'  ,borderColor:"white",
      height: '40px',borderRadius:"12px",fontSize:'13px',color:"black",textTransform:"capitalize"}} 
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomCancelButton;