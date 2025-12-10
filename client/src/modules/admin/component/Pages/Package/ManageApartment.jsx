import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Table, TableBody, TableCell, tableCellClasses, TableContainer,
  TableHead, TableRow, Paper, Typography, Box, Button,
  IconButton, Modal
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import PreviewIcon from "@mui/icons-material/Preview";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import config from "../../../../../config/Hosts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "10px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#331a00',
    color: theme.palette.common.white,
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

export default function ManageApartment() {
  const host = config.host;
  const [apartments, setApartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState({});
  const serviceProviderId = localStorage.getItem("userId");

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`${host}/api/apartment/getAllApartments`);
        setApartments(response.data);
      } catch (err) {
        console.error("Error fetching apartments:", err);
      }
    };
    fetchApartments();
  }, [host]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this apartment",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${host}/api/apartment/deleteApartment/${id}`)
          .then(() => {
            setApartments(apartments.filter((apt) => apt._id !== id));
            Swal.fire("Deleted!", "Apartment has been deleted.", "success");
          })
          .catch((err) => {
            console.error("Error deleting apartment:", err);
            Swal.fire("Failed!", "Apartment could not be deleted. Please try again.", "error");
          });
      }
    });
  };

  const handleOpen = (apt) => {
    setSelectedApartment(apt);
    setOpen(true);
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
          <Typography variant="h6" sx={{ mb: 2, color: "#331a00", fontWeight: 500 }}>
            Manage Apartments
          </Typography>
          <Link to="/Admin/AddApartment">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#331a00 !important" }}
              startIcon={<AddIcon />}
              size="small"
            >
              Add Apartment
            </Button>
          </Link>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Thumbnail</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Preview</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apartments.map((apt) => (
                <StyledTableRow key={apt._id}>
                  <StyledTableCell>
                    <img
                      src={`${host}/api/image/${apt.thumbnail}`}
                      width={110}
                      height={110}
                      style={{ borderRadius: "10px" }}
                      alt="Thumbnail"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">{apt.name}</StyledTableCell>
                  <StyledTableCell align="center">₹{apt.rentOrSalePrice}</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={() => handleOpen(apt)}>
                      <PreviewIcon color="success" />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {/* <Link to={`/admin/UpdateApartment/${apt._id}`}>
                      <IconButton><BorderColorIcon /></IconButton>
                    </Link> */}
                    <IconButton onClick={() => handleDelete(apt._id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#331a00" }}>
              Apartment Details
            </Typography>

            <Box sx={{ mt: 2 }}>
              <img
                src={`${host}/api/image/${selectedApartment.thumbnail}`}
                width="100%"
                style={{ borderRadius: 10 }}
                alt="Thumbnail"
              />
            </Box>

            <Typography sx={{ mt: 2 }}><strong>Name:</strong> {selectedApartment.name}</Typography>
            <Typography><strong>Address:</strong> {selectedApartment.address}</Typography>
            <Typography><strong>City:</strong> {selectedApartment.city}</Typography>
            <Typography><strong>Zip Code:</strong> {selectedApartment.zipCode}</Typography>
            <Typography><strong>Area (sqft):</strong> {selectedApartment.areaSqFt}</Typography>
            <Typography><strong>Price:</strong> ₹{selectedApartment.rentOrSalePrice}</Typography>
            <Typography><strong>Status:</strong> {selectedApartment.availabilityStatus}</Typography>
            <Typography><strong>Contact Name:</strong> {selectedApartment.contactName}</Typography>
            <Typography><strong>Contact Phone:</strong> {selectedApartment.contactPhone}</Typography>

            {selectedApartment.description && (
              <Typography sx={{ mt: 2 }}><strong>Description:</strong> {selectedApartment.description}</Typography>
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#331a00" }}>
                Amenities
              </Typography>
              <ul>
                {selectedApartment.amenities?.length > 0 ? (
                  selectedApartment.amenities.map((item, index) => (
                    <li key={index}>
                      <Typography>{item}</Typography>
                    </li>
                  ))
                ) : (
                  <Typography>No amenities listed.</Typography>
                )}
              </ul>
            </Box>
          </Box>
        </Modal>
      </Paper>
    </div>
  );
}
