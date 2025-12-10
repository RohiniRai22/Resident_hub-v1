import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import axios from "axios";
import PreviewIcon from "@mui/icons-material/Preview";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import config from "../../../../../config/Hosts";

const style = {
  position: "absolute",
  top: "50%",
  borderRadius: "10px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  maxHeight: "500px",
  overflowY: "auto",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#331a00', // Set the background color to #331a00
    color: theme.palette.common.white, // Set text color to white for contrast
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ManagePackage() {
  const host = config.host;
  const [packages, setPackages] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [subServiceMap, setSubServiceMap] = useState({});
  const [open, setOpen] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    const serviceProviderId = localStorage.getItem("serviceProviderId")?.replace(/"/g, "");
  
    if (!serviceProviderId) {
      console.error("Service provider ID is not available.");
      return;
    }
  
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${host}/api/service-provider/getAllPackagesByProvider/${serviceProviderId}`);
        setPackages(response.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };
  
    fetchPackages();
  }, []);
  
  
  

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this package",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`${host}/api/service-provider/delete-package/${id}`)
          .then(() => {
            setPackages(packages.filter((pkg) => pkg._id !== id));
            Swal.fire("Deleted!", "Package has been deleted.", "success");
          })
          .catch((err) => {
            console.error("Error deleting package:", err);
            Swal.fire("Failed!", "Package could not be deleted. Please try again.", "error");
          });
      }
    });
  };

  const handleOpen = (pkg) => {
    setOpen(true);
    setSelectedPackage(pkg);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Paper sx={{ padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "#331a00", fontWeight: "500" }}
          >
            Manage Packages
          </Typography>
          <Link to="/service-provider/add-package">
            <Button
              variant="contained"
              color="success"
              sx={{ backgroundColor: "#331a00 !important" }}
              startIcon={<AddIcon />}
              size="small"
            >
              Add Package
            </Button>
          </Link>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ backgroundColor: '#331a00' }}>
              <TableRow>
                <StyledTableCell>Thumbnail</StyledTableCell>
                <StyledTableCell align="center">Title</StyledTableCell>
                {/* <StyledTableCell align="center">Sub-Service</StyledTableCell> */}
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((pkg) => (
                <StyledTableRow key={pkg._id}>
                  <StyledTableCell component="th" scope="row">
                    <img
                      src={`http://localhost:5000/api/image/${pkg.thumbnail}`} // Ensure the port matches and path is correct
                      width={110}
                      height={110}
                      style={{ borderRadius: "10px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">{pkg.title}</StyledTableCell>
                  {/* <StyledTableCell align="center">
                    {subServiceMap[pkg.sub_service] || "N/A"}
                  </StyledTableCell> */}
                  <StyledTableCell align="center">₹{pkg.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={() => handleOpen(pkg)}>
                      <PreviewIcon color="success" />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`/service-provider/update-package/${pkg._id}`}>
                      <IconButton>
                        <BorderColorIcon />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleDelete(pkg._id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: "600", color: "grey" }}
            >
              Package Description
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {selectedPackage.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: "600", color: "grey" }}
              >
                Package Amenities
              </Typography>
              <ul>
                {selectedPackage.amenities && selectedPackage.amenities.length > 0 ? (
                  selectedPackage.amenities.map((item, index) => (
                    <li key={index}>
                      <Typography sx={{ mt: 2 }}>
                        {item}
                      </Typography>
                    </li>
                  ))
                ) : (
                  <Typography>No amenities available</Typography>
                )}
              </ul>
            </Box>
          </Box>
        </Modal>
      </Paper>
    </div>
  );
}
