

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useParams } from 'react-router-dom'; // To get serviceProviderId from URL
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import axios from "axios";

// Styling for table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#331a00', // Set the background color to #331a00
    color: theme.palette.common.white, // Set text color to white for contrast
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


// Styling for table rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewPayments() {
  const { serviceProviderId } = useParams(); // Correctly destructure serviceProviderId from useParams
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Ensure serviceProviderId is valid and not undefined
   

    // Fetch payments by service provider ID
    axios
      .get(`http://localhost:5000/api/payment/getAllPayments`)
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          const sortedData = res.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPayments(sortedData);
        } else {
          setError("Error processing data. Please try again later.");
        }
      })
      .catch((err) => {
        setError("Error fetching payments. Please try again later.");
        console.error("Error fetching payments:", err.response ? err.response.data : err.message);
      });
  });

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
            View Payments
          </Typography>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Payment ID</StyledTableCell>
                <StyledTableCell align="center">Order ID</StyledTableCell>
                <StyledTableCell align="center">Transaction ID</StyledTableCell>
                <StyledTableCell align="center">Payment Status</StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
                <StyledTableCell align="center">Updated At</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.length > 0 ? (
                payments.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell align="center">{row._id}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.orderId?._id || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.transactionId || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.paymentStatus || "Unknown"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(row.createdAt).toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(row.updatedAt).toLocaleString()}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={6}>
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
