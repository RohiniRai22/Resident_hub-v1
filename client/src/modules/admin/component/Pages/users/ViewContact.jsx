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
import { Box } from "@mui/material";
import axios from "axios";
import config from "../../../../../config/Hosts";

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

export default function ViewContact() {
  const host = config.host;
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get(`${host}/api/contact/getcontacts`)
      .then((res) => setContacts(res.data))
      .catch((err) => console.log(err));
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
            View Complaints
          </Typography>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">First Name</StyledTableCell>
                <StyledTableCell align="center">Last Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Subject</StyledTableCell>
                <StyledTableCell align="center">Message</StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <StyledTableRow key={contact._id}>
                    <StyledTableCell align="center">{contact.firstName}</StyledTableCell>
                    <StyledTableCell align="center">{contact.lastName}</StyledTableCell>
                    <StyledTableCell align="center">{contact.email}</StyledTableCell>
                    <StyledTableCell align="center">{contact.subject}</StyledTableCell>
                    <StyledTableCell align="center">{contact.message}</StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(contact.createdAt).toLocaleString()}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={6} align="center">
                    No Contact Messages Found
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
