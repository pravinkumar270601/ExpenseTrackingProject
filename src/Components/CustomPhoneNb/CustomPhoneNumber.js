import React from "react";

const CustomPhoneNumber = () => {
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
    <div>
        <InputLabel
        htmlFor="movie-name"
        className="input-heading"
        sx={{ fontSize: "14px", fontWeight: "700" }}
      >
        Movie Name
      </InputLabel>
      <TextField
      autoComplete="off"
        id="phone"
        placeholder="Phone Number"
        variant="outlined"
        type="number"

        // sx={{width:290}}

        InputProps={{
          startAdornment: (
            <FormControl>
              {/* <InputLabel id="country-label">Country Code</InputLabel> */}
              <Select
                labelId="country-label"
                id="country"
                value={country}
                onChange={handleCountryChange}
                style={{
                  Width: "40px ",
                  marginLeft: -14,
                  fontSize: 20,
                  padding: -100,
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.code}
                    {/* ({country.name}) */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ),
        }}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default CustomPhoneNumber;
