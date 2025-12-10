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
import config from "../../../../../config/Hosts";

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

export default function ViewUsers() {
  const host = config.host;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${host}/api/user/get-user`)
      .then((res) => {
        const sortedData = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setData(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            View Residents
          </Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Avatar</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                {/* <StyledTableCell align="center">Phone</StyledTableCell> */}
                {/* <StyledTableCell align="center">Address</StyledTableCell> */}
                <StyledTableCell align="center">Created At</StyledTableCell>
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
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">
                        {row.phone || "--"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.address || "--"}
                        </StyledTableCell> */}
                      <StyledTableCell align="center">
                        {row.createdAt
                          ? new Date(row.createdAt).toLocaleString()
                          : "--"}{" "}
                      </StyledTableCell>
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
