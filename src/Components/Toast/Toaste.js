import React from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";


const Toast = ({ message,backColor}) => {
  console.log("valla", message);
  return (
    <div style={{ position: "fixed", top: 20, right: 20, alignItems:"center",color:"white"}}>
      <div className="toast show toast_flex" style={{width:"209px",backgroundColor: backColor}} >
        <div className="toast-body" style={{display:"flex"}}>
        <IoCheckmarkDoneCircle 
       style={{fontSize:"32px",color:'rgb(244, 247, 244)',marginLeft:"6px",marginTop:"1px"}}
        />
          <p style={{marginBottom:"0",marginTop:"7px",marginLeft:"5px"}}>{message}</p>
          {/* <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            
          ></button> */}
        </div>
       

      </div>
    </div>
  );
};

export default Toast;