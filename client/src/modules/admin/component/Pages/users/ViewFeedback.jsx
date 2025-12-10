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
import { Box, Avatar } from "@mui/material";
import axios from "axios";
import config from "../../../../../config/Hosts"; // Adjust the import as needed

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

export default function ViewFeedback() {
  const host = config.host;
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get(`${host}/api/feedback/getAllFeedbacks`)
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [host]);

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
            View Feedback
          </Typography>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                {/* <StyledTableCell align="center">Booking ID</StyledTableCell> */}
                <StyledTableCell align="center">Service Provider</StyledTableCell>
                <StyledTableCell align="center">Message</StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                  <StyledTableRow key={feedback._id}>
                    <StyledTableCell align="center">
                      {feedback.userId ? feedback.userId.name : "--"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {feedback.userId ? feedback.userId.email : "--"}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
                      {feedback.bookingId || "--"}
                    </StyledTableCell> */}
                    <StyledTableCell align="center">
                      {feedback.serviceProviderId ? feedback.serviceProviderId.name : "--"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {feedback.message || "--"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {feedback.createdAt
                        ? new Date(feedback.createdAt).toLocaleString()
                        : "--"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={6} align="center">
                    No Data Found
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
