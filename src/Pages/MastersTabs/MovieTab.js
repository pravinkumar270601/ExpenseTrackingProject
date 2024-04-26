import React, { useState } from 'react';
import CustomInput from '../../Components/CustomInput/CustomInput';
import CustomDropdownMui from '../../Components/CustomDropDown/CustomDropdown';


const MovieTab = () => {
    const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
    { id: 3, value: "Option 3" },
  ];

  const handleSelect = (id) => {
    setSelectedOption(id);
    console.log("Selected option id:", id);
    // Do something with the selected option
  };
    return (
        <div>
           {/* <CustomDropdownMui options={options} onSelect={handleSelect} /> */}
           <CustomInput/> 
        </div>
    );
};

export default MovieTab;