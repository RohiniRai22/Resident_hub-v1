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
import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export default function ManageService() {
  const host = config.host;
  const [service, setService] = useState([]);
  const [open, setOpen] = useState(false);
  const [editService, setEditService] = useState({});
  const [delService, setDelService] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`${host}/api/admin/get-service`)
      .then((res) => {
        const sortedData = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setService(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [delService]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this service",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${host}/api/admin/delete-service/${id}`)
          .then((response) => {
            setDelService(!delService);
            Swal.fire("Deleted!", "Service has been deleted.", "success");
          })
          .catch((err) => {
            console.log("Error : " + err);
          });
      }
    });
  };

  const handleOpenEditModal = (service) => {
    setEditService(service);
    setOpen(true);
  };

  const handleEditService = (e) => {
    const { name, value } = e.target;
    setEditService({ ...editService, [name]: value });
  };

  const handleUpdateService = () => {
    axios
      .put(`${host}/api/admin/update-service/${editService._id}`, editService)
      .then((res) => {
        setDelService(!delService);
        setOpen(false);
        toast.success("Service updated successfully!");
      })
      .catch((err) => {
        toast.error("Failed to update service!");
        console.log(err);
      });
  };

  return (
    <div style={{ height: "100vh" }}>
      <Paper sx={{ padding: "20px 20px 20px 20px" }}>
        <ToastContainer />
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
            Manage Category
          </Typography>
          <Link to="/admin/add-service">
            <Button
              variant="contained"
              color="success"
              sx={{ backgroundColor: "#331a00 !important" }}
              startIcon={<AddIcon />}
              size="small"
            >
              Add Category
            </Button>
          </Link>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {service.length > 0
                ? service.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell align="center">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton onClick={() => handleOpenEditModal(row)}>
                          <BorderColorIcon sx={{ color: "blue" }} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(row._id)}
                          sx={{ border: "none" }}
                        >
                          <DeleteOutlineIcon sx={{ color: "red" }} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                : "No Data Found"}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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
            sx={{ color: "#331a00", fontWeight: "500" }}
          >
            Edit Service
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Service Name"
            name="name"
            value={editService.name || ""}
            onChange={handleEditService}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateService}
            sx={{ mt: 2, backgroundColor: "#8bc34a !important" }}
          >
            Update Service
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
