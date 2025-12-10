import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CommentIcon from "@mui/icons-material/Comment";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Tooltip } from "@mui/material";
import logo from "../../../../../images/logoo1.png"
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

const drawerWidth = 240;
const serviceProviderId = localStorage.getItem('serviceProviderId');
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "#331a00", // Updated color
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      background: "#331a00", // Updated color
      backgroundImage: "linear-gradient(to bottom, #331a00, #331a00)", // White linear gradient
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      background: "#331a00", // Updated color
      backgroundImage: "linear-gradient(to bottom, #331a00, #331a00)", // White linear gradient
    },
  }),
}));

export default function Navigation() {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [token, setToken] = useState(null);
  const [serviceProviderId, setServiceProviderId] = useState(null);
  const nav = useNavigate();
const [bookingCount, setBookingCount] = useState(0);

useEffect(() => {
  if (!serviceProviderId) return;

  const fetchBookingCount = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/booking/count/${serviceProviderId}`);
      const data = await response.json();
      setBookingCount(data.count);
    } catch (error) {
      console.error("Failed to fetch booking count:", error);
    }
  };

  fetchBookingCount();
  const interval = setInterval(fetchBookingCount, 10000);
  return () => clearInterval(interval);
}, [serviceProviderId]);


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("serviceToken"));
    if (!token) {
      nav("/service-provider/login");
    } else {
      setToken(token);

      const id = localStorage.getItem("serviceProviderId");
      if (id) {
        const cleanId = id.replace(/^"|"$/g, '');
        setServiceProviderId(cleanId);
      }
    }
  }, [nav]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("serviceToken");
      localStorage.removeItem("serviceProviderId");
      setToken(null);
      setServiceProviderId(null);
      nav("/service-provider/login");
    }
  };

  useEffect(() => {
    const currentRoute = location.pathname;

    if (currentRoute.includes("/service-provider/manage-course")) {
      setActiveItem("Manage Course");
    } else if (currentRoute.includes("/service-provider/add-course")) {
      setActiveItem("Manage Course");
    } else if (currentRoute.includes("/service-provider/")) {
      setActiveItem("Dashboard");
    } else if (currentRoute.includes("/service-provider/view-user")) {
      setActiveItem("View User");
    } else if (currentRoute.includes("/service-provider/feedback")) {
      setActiveItem("Feedback");
    } else {
      setActiveItem("");
    }
  }, [location.pathname]);

  const sideBarList = [
    {
      title: "Dashboard",
      path: "/service-provider/",
      icon: <DashboardIcon sx={{ fontSize: "14px", color: "white" }} />, // Updated color
    },
 
    {
      title: "Manage Bookings",
      path: "/service-provider/ViewBookings",
      icon: <GroupAddIcon sx={{ fontSize: "14px", color: "white" }} />, // Updated color
    },
  
    
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        className="nav"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: "white",
                marginRight: 2,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <img
                src={logo}
                alt="Logo"
                style={{ height: '40px', marginRight: '10px' }} // Adjust size as needed
              />
              <AcUnitIcon sx={{ fontSize: "24px", color: "#ffffff" }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: "#ffffff", fontWeight: "500", marginLeft: '10px' }}
              >
                Service Provider
              </Typography>
            </Box>
          </Toolbar>
          <Box>
            <Tooltip title="Bookings">
  <IconButton
    component={Link}
    to="/service-provider/ViewBookings"
    sx={{ color: "white" }}
  >
    <Badge badgeContent={bookingCount} color="error">
      <NotificationsIcon />
    </Badge>
  </IconButton>
</Tooltip>

            {/* <Tooltip title="My Profile" arrow>
              <Link to="/service-provider/my-profile">
                <IconButton
                  sx={{
                    color: "white",
                    fontSize: "15px",
                    border: "none",
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Link>
            </Tooltip> */}
            <Tooltip title="Logout" arrow>
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: "white",
                  fontSize: "15px",
                  border: "none",
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
      >
        <DrawerHeader
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "15px",
                      }}
                    >
                      {/* <AcUnitIcon
                        sx={{
                          fontSize: "29px",
                          color: "#ffffff",
                        }}
                      /> */}
                      <Typography
                        variant="h6"
                        sx={{ ml: 1, color: "white", fontWeight: 900 }}
                      >
                        ResidentHub
                      </Typography>
                    </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {sideBarList.map((item) => (
            <ListItem
              key={item.title}
              component={Link}
              to={item.path}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                selected={activeItem === item.title}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{ color: "#ffffff" }} // Updated color
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "white", // Updated color
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
