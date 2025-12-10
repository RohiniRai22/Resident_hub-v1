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
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import logo from "../../../../../images/logo2.png"; // Adjust the path as needed

const drawerWidth = 240;

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
  background: "linear-gradient(to right, #ffffff,#331a00)",
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
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navigation() {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const currentRoute = location.pathname;

    if (currentRoute.includes("/admin/manage-course")) {
      setActiveItem("Manage Course");
    } else if (currentRoute.includes("/admin/add-course")) {
      setActiveItem("Manage Course");
    } else if (currentRoute.includes("/admin/")) {
      setActiveItem("Dashboard");
    } else if (currentRoute.includes("/admin/view-user")) {
      setActiveItem("View User");
    } else if (currentRoute.includes("/admin/feedback")) {
      setActiveItem("Feedback");
    } else {
      setActiveItem("");
    }
  }, [location.pathname]);

  const [token, setToken] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("adminToken"));
    if (!token) {
      nav("/admin/login");
    }
    setToken(token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    alert("Are you sure you want to log out?")
    nav("/admin/login");
  };

  const sideBarList = [
    {
      title: "Dashboard",
      path: "/admin/",
      icon: <DashboardIcon sx={{ fontSize: "14px", color: "white" }} />,
    },
     {
      title: "Residents",
      path: "/admin/view-user",
      icon: <GroupAddIcon sx={{ fontSize: "14px", color: "white" }} />,
    },
      {
      title: "Service Provider",
      path: "/admin/view-service-provider",
      icon: <GroupAddIcon sx={{ fontSize: "14px", color: "white" }} />,
    },
    {
      title: "Apartment category",
      path: "/admin/manage-service",
      icon: <CastForEducationIcon sx={{ fontSize: "14px", color: "white" }} />,
    },
    {
      title: "Manage Apartment",
      path: "/admin/ManageApartment",
      icon: <CommentIcon sx={{ fontSize: "14px", color: "white" }} />,
    },
    {
      title: "Apartment Booking",
      path: "/admin/ViewBookings",
      icon: <CastForEducationIcon sx={{ fontSize: "14px", color: "white" }} />,
    },
   
  
    {
      title: "View Payments",
      path: "/admin/ViewPayments",
      icon: <AssessmentIcon sx={{ fontSize: "14px", color: "white" }} />,
    },
    {
      title: "Feedback",
      path: "/admin/ViewFeedback",
      icon: <CommentIcon sx={{ fontSize: "14px", color: "white" }} />,
    },
    {
      title: "Complaints",
      path: "/admin/ViewContact",
      icon: <CommentIcon sx={{ fontSize: "14px", color: "white" }} />,
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
        style={{
          background: "linear-gradient(to right, #ffffff,#331a00)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: "#331a00",
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: '40px', marginRight: '10px' }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: "#331a00", fontWeight: "900" }}
              >
                Admin Dashboard
              </Typography>
            </Box>
          </Toolbar>
          <IconButton
            sx={{
              color: "white",
              fontSize: "15px",
              padding: "20px",
              border: "none",
            }}
            onClick={handleLogout}
          >
            <LogoutIcon />
            Logout
          </IconButton>
        </Box>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box
          sx={{
            backgroundColor: "#331a00",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
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
            <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            {sideBarList.map((item) => (
              <ListItem
                key={item.title}
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    ...(activeItem === item.title && {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "4px",
                    }),
                  }}
                  onClick={() => setActiveItem(item.title)}
                >
                  <ListItemIcon
                    sx={{
                      color: "#ffffff",
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ color: "#ffffff", opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
