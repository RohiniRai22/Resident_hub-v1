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
import { Box, Select, MenuItem } from "@mui/material";
import axios from "axios";

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

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  
  // Retrieve serviceProviderId from localStorage without surrounding quotes
  const serviceProviderId = localStorage.getItem("serviceProviderId").replace(/"/g, "");

  // Fetch bookings on component load
  useEffect(() => {
    if (serviceProviderId) {

        axios.get(`http://localhost:5000/api/booking/getBookingsByServiceProvider/${serviceProviderId}`)

        .then((res) => {
          console.log(res.data); 
          const sortedData = res.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setBookings(sortedData);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
        });
    } else {
      console.error("Service provider ID not found in localStorage.");
    }
  }, [serviceProviderId]);

  // Function to handle status change and update it in the backend
  const handleStatusChange = (bookingId, newStatus) => {
    const userConfirmed = window.confirm("Are you sure you want to update the status?");
    if (!userConfirmed) {
      return; // Exit if the user cancels
    }
axios.put(`http://localhost:5000/api/booking/updateBooking/${bookingId}`, {
        status: newStatus, // Send the updated status
        
      })
      .then((res) => {
        console.log("Booking updated:", res.data);
        window.alert("Status updated successfully!");

        // Update the booking list in the frontend
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
      })
      .catch((err) => {
        console.error("Error updating booking:", err);
        window.alert("Error updating status. Please try again.");
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
            View Bookings
          </Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {/* <StyledTableCell align="center">Booking ID</StyledTableCell> */}
                <StyledTableCell align="center">Apartment Name</StyledTableCell>

                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Full Name</StyledTableCell>
                <StyledTableCell align="center">Email Address</StyledTableCell>
                <StyledTableCell align="center">Phone Number</StyledTableCell>
                <StyledTableCell align="center">Service Date/Time</StyledTableCell>
            
                <StyledTableCell align="center">Status</StyledTableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((row) => (
                  <StyledTableRow key={row._id}>
                    {/* <StyledTableCell align="center">{row._id}</StyledTableCell> */}
                    <StyledTableCell align="center">
  {row.apartmentId ? row.apartmentId.name : 'N/A'}
</StyledTableCell>
                    <StyledTableCell align="center">
  {row.apartmentId ? row.apartmentId.address : 'N/A'}
</StyledTableCell>

                    <StyledTableCell align="center">{row.fullName}</StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                    <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
                   <StyledTableCell align="center">
                      {new Date(row.createdAt).toLocaleString()}
                    </StyledTableCell>
                   
                    <StyledTableCell align="center">
                      <Select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row._id, e.target.value)}
                        displayEmpty
                        fullWidth
                        style={{ width: 150 }}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Confirmed">Confirmed</MenuItem>
                        <MenuItem value="Paid">Paid</MenuItem>
<MenuItem value="Completed">Completed</MenuItem>
<MenuItem value="Vacating Soon">Vacating Soon</MenuItem>
                      </Select>
                    </StyledTableCell>
                    
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={9}>
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
