import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

export default function NavBar(props) {
  const { drawerWidth, content } = props;

  const location = useLocation();
  const path = location.pathname;

  const [open, setOpen] = React.useState(false);

  // Function to toggle the open status of the drawer
  const changeOpenStatus = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Company Logo */}
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>

          {/* Responsive Menu Button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={changeOpenStatus}
            sx={{ display: { xs: "block", md: "none" } }}>
            <MenuIcon />
          </IconButton>

          {/* Navigation Links (Drawer for smaller screens) */}
          <List
            component="nav"
            aria-label="main mailbox folders"
            sx={{
              display: { xs: "none", md: "flex" },
              gap: "20px",
              flexDirection: "row",
            }}>
            <ListItem>
              <ListItemButton component={Link} to="/" selected={"/" === path}>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component={Link}
                to="/about"
                selected={"/about" === path}>
                <ListItemText primary={"About"} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component={Link}
                to="/create"
                selected={"/create" === path}>
                <ListItemText primary={"Create"} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component={Link}
                to="/products"
                selected={"/products" === path}>
                <ListItemText primary={"Products"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>

      {/* Responsive Drawer for smaller screens */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={changeOpenStatus}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}>
        <List>
          <ListItem>
            <ListItemButton component={Link} to="/" selected={"/" === path}>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              component={Link}
              to="/about"
              selected={"/about" === path}>
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              component={Link}
              to="/create"
              selected={"/create" === path}>
              <ListItemText primary={"Create"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Responsive Container for content */}
        {content}
      </Box>
    </>
  );
}
