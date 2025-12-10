import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useParams } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material"; // Add a loading spinner
import axios from "axios";

// Styled TableCell and TableRow for MUI Table
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

export default function ViewBookingFeedback() {
  const { serviceProviderId } = useParams(); // Get serviceProviderId from URL
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Service Provider ID:", serviceProviderId); // Log the ID to check if it is being fetched
  
    if (serviceProviderId) {
      axios
        .get(`http://localhost:5000/api/feedback/byServiceProvider/${serviceProviderId}`)
        .then((res) => {
          console.log("API Response:", res.data); // Log the API response
          
          if (Array.isArray(res.data)) {
            const sortedData = res.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setFeedbacks(sortedData);
          } else {
            setError("Unexpected API response format.");
          }
        })
        .catch((err) => {
          setError("No Feedback Found");
          console.error("Error fetching feedbacks:", err.response ? err.response.data : err.message);
        })
        .finally(() => {
          setLoading(false); // Stop loading spinner once the data is fetched
        });
    } else {
      setError("Invalid service provider ID.");
      setLoading(false);
    }
  }, [serviceProviderId]);
  
  

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
            View Booking Feedback
          </Typography>
        </Box>

        {/* Show Loading Spinner */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <CircularProgress />
          </Box>
        )}

        {/* Display error message if there is an error */}
        {error && (
          <Typography color="error" sx={{ textAlign: "center", marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {/* Display feedback data when available */}
        {!loading && !error && feedbacks.length > 0 ? (
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Feedback ID</StyledTableCell>
                  <StyledTableCell align="center">User ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Message</StyledTableCell>
                  <StyledTableCell align="center">Created At</StyledTableCell>
                  <StyledTableCell align="center">Updated At</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {feedbacks.map((row) => (
    <StyledTableRow key={row._id}>
      <StyledTableCell align="center">{row._id}</StyledTableCell>
      <StyledTableCell align="center">
        {row.userId && row.userId._id ? row.userId._id : "N/A"}
      </StyledTableCell>
      <StyledTableCell align="center">
        {row.userId && row.userId.name ? row.userId.name : "N/A"}
      </StyledTableCell>
      <StyledTableCell align="center">
        {row.userId && row.userId.email ? row.userId.email : "N/A"}
      </StyledTableCell>
      <StyledTableCell align="center">
        {row.message || "N/A"}
      </StyledTableCell>
      <StyledTableCell align="center">
        {new Date(row.createdAt).toLocaleString()}
      </StyledTableCell>
      <StyledTableCell align="center">
        {new Date(row.updatedAt).toLocaleString()}
      </StyledTableCell>
    </StyledTableRow>
  ))}
</TableBody>


            </Table>
          </TableContainer>
        ) : (
          // Show message when no feedback is found
          !loading && !error && (
            <Typography sx={{ textAlign: "center", marginTop: 2 }}>
              No Feedbacks Found
            </Typography>
          )
        )}
      </Paper>
    </div>
  );
}
