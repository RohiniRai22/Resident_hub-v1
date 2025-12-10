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
import { Box, Avatar, IconButton, Tooltip, Chip, Button } from "@mui/material";
import axios from "axios";
import config from "../../../../../config/Hosts";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#331a00', // Set the background color to #264d73
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

export default function ViewServiceProvider() {
  const host = config.host;
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    axios
      .get(`${host}/api/service-provider/get-service-provider`)
      .then((res) => {
        console.log(res, "res");
        const sortedData = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setData(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle]);

  const handleStatus = async (id, status) => {
    let text = "You want to Approve this Service Provider";
    if (status == "rejected") {
      text = "You want to Reject this Service Provider";
    } else {
      text = "You want to Approve this Service Provider";
    }
    Swal.fire({
      title: "Are you sure?",
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${host}/api/service-provider/update-service-provider/${id}`, {
            status,
          })
          .then((response) => {
            setToggle(!toggle);
            Swal.fire(
              "Updated!",
              `Service-Provider has been ${status}ed.`,
              "success"
            );
          })
          .catch((err) => {
            console.log("Error : " + err);
          });
      }
    });
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
            View Service Provider
          </Typography>
          <Link to="/admin/AddServiceProvider">
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ backgroundColor: "#331a00 !important" }}
                        startIcon={<AddIcon />}
                        size="small"
                      >
                        Add Service Provider
                      </Button>
                    </Link>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Avatar</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email/Phone</StyledTableCell>
                {/* <StyledTableCell align="center">Business Name</StyledTableCell> */}
                <StyledTableCell align="center">Business Type</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
                {/* <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0
                ? data.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row.thumbnail ? (
                          <img
                            src={`http://localhost:5000/api/image/${row.thumbnail}`}
                            alt=""
                            width={40}
                            height={40}
                            style={{ borderRadius: "50%" }}
                          />
                        ) : (
                          <Avatar>{row.name?.charAt(0).toUpperCase()}</Avatar>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.email}
                        <br />
                        {row.phone || "--"}
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">
                        {row.businessName || "--"}
                      </StyledTableCell> */}
                      <StyledTableCell align="center">
                        {row.businessType?.name || "--"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.address || "--"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.createdAt
                          ? new Date(row.createdAt).toLocaleString()
                          : "--"}
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">
                        <Chip label={row.status || "--"} color="warning" />
                      </StyledTableCell> */}
                      {/* <StyledTableCell align="center">
                        {row.status == "pending" ? (
                          <>
                            {" "}
                            <Tooltip title="Approve" arrow>
                              <IconButton
                                sx={{ border: "none" }}
                                onClick={() =>
                                  handleStatus(row._id, "approved")
                                }
                              >
                                <CheckBoxIcon sx={{ color: "green" }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject" arrow>
                              <IconButton
                                sx={{ border: "none" }}
                                onClick={() =>
                                  handleStatus(row._id, "rejected")
                                }
                              >
                                <CancelPresentationIcon sx={{ color: "red" }} />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <></>
                        )}
                      </StyledTableCell> */}
                    </StyledTableRow>
                  ))
                : "No Data Found"}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
