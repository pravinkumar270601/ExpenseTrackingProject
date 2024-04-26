import * as React from "react";
import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { RiVipCrown2Fill } from "react-icons/ri";
import { BsFileBarGraphFill } from "react-icons/bs";
import ExpenseSheet from "../../Pages/ExpenseSheet";
import Masters from "../../Pages/Masters";

const drawerWidth = 240;

function SideNav(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentComponent, setCurrentComponent] = React.useState(<Masters />);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  // const handleDrawerToggle = () => {
  //   if (!isClosing) {
  //     setMobileOpen(!mobileOpen);
  //   }
  // };


  const handleNavigation = (component) => {
    setCurrentComponent(component);
    setMobileOpen(false); // Close the drawer on navigation
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => handleNavigation(<Masters />)}>
          <ListItemButton>
            <ListItemIcon>
              <RiVipCrown2Fill />
            </ListItemIcon>
            <ListItemText primary="Masters" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => handleNavigation(<ExpenseSheet />)}>
          <ListItemButton>
            <ListItemIcon>
              <BsFillFileEarmarkTextFill />
            </ListItemIcon>
            <ListItemText primary="ExpenseSheet" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BsFileBarGraphFill />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="sidenav-div">
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
           width: "100%",
          height: "100vh",
          padding: "0px",


        }}
      >
        
        {currentComponent}
      </Box>
    </Box>
    </div>
  );
}

SideNav.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default SideNav;