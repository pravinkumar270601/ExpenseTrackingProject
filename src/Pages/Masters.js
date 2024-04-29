import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import userIcon from "../Assets/wp5609640-broly-computer-wallpapers.jpg";
import MovieTab from "./MastersTabs/MovieTab";
import LocationTab from "./MastersTabs/LocationTab";
import CategoryTab from "./MastersTabs/CategoryTab";
import SubcategoryTab from "./MastersTabs/SubcategoryTab";
import CrewTab from "./MastersTabs/CrewTab";
import "../Pages/Css/Masters.css";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: "100%" }} // Set height to 100%
      {...other}
    >
      {value === index && <div style={{ height: "100%" }}>{children}</div>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(name) {
  return {
    id: `simple-tab-${name}`,
    "aria-controls": `simple-tabpanel-${name}`,
  };
}

const Masters = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="master-main-page">
      <Box sx={{ width: " 100%", height: "100vh", background: `var(--page-bg-color)` }}>
        <Box sx={{ borderColor: "divider", height: "16%" }}>
          <Grid container md={12} sx={{ height: "55%" }}>
            <Grid
              item
              md={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="pages-h1">
                <h1>Masters</h1>
              </div>
              <div
                className="d-flex align-items-end"
                style={{ marginBottom: "-46px" }}
              >
                <div className=" user-div d-flex ">
                  <div className="username">Username </div>
                  <div className="user-img-div">
                    <img src={userIcon} alt="User" />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              height: "45%",
              // indicatorColor: "red"
            }}
          >
            <Tab
              label="Movie"
              {...a11yProps("Movie")}
              sx={{ marginLeft: "30px", marginRight: "50px",textTransform: "none" }}
            />
            <Tab
              label="Location"
              {...a11yProps("Location")}
              sx={{ marginRight: "50px",textTransform: "none" }}
            />
            <Tab
              label="Category"
              {...a11yProps("Category")}
              sx={{ marginRight: "50px",
              textTransform: "none" }}
            />
            <Tab
              label="Subcategory"
              {...a11yProps("Subcategory")}
              sx={{ marginRight: "50px",textTransform: "none" }}
            />
            <Tab label="Crew" {...a11yProps("Crew")} sx={{textTransform: "none" }} />
          </Tabs>
        </Box>
        <Box sx={{ width: " 100%", height: "82%", marginTop: "1%" }}>
          <CustomTabPanel value={value} index={0}>
            <MovieTab />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <LocationTab />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <CategoryTab />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <SubcategoryTab />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <CrewTab />
          </CustomTabPanel>
        </Box>
      </Box>
    </div>
  );
};

export default Masters;
