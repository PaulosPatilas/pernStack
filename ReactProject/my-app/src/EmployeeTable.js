import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import EmployeeRow from "./EmployeeRow";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import EditIcon from "@mui/icons-material/Edit";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  ButtonGroup,
  Button,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/material";
import "./EmployeeTable.css";
import { Container } from "@mui/material";
import { NoEncryption } from "@mui/icons-material";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 150,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") == null ||
      localStorage.getItem("token") == undefined
    ) {
      navigate("/");
    } else {
      fetch("api/employees", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setEmployees(result);
        });
    }
  }, []);

  function handleClose() {
    setOpen();
  }

  async function handleDeleteClick(id) {
    await fetch(`api/employee/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedEmployees = [...employees].filter((i) => i.id !== id);
      setEmployees(updatedEmployees);
      setOpen(false);
    });
  }

  const employeeList = employees.map((employee) => {
    return (
      <>
        <TableRow key={employee.id}>
          <EmployeeRow
            edit={true}
            id={employee.id}
            LastName={employee.last_name}
            FirstName={employee.first_name}
            BirthDate={employee.date_of_birth}
            is_active={employee.is_active}
          />
          <Stack
            style={{ marginTop: 10 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              startIcon={<DeleteIcon />}
              variant="outlined"
              color="secondary"
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
            <Button color="primary" variant="outlined" startIcon={<EditIcon />}>
              <Link
                style={{ textDecoration: "none" }}
                to={"/employees/" + employee.id}
              >
                Editor
              </Link>
            </Button>
          </Stack>
        </TableRow>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              WARNING
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete employee {employee.last_name}{" "}
              {employee.first_name} ?
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: 20, marginTop: 30 }}
              onClick={() => {
                handleDeleteClick(employee.id);
              }}
            >
              {" "}
              Yes{" "}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: 200, marginTop: 30 }}
              onClick={() => {
                setOpen(false);
              }}
            >
              {" "}
              No{" "}
            </Button>
          </Box>
        </Modal>{" "}
      </>
    );
  });

  return (
    <div>
      <Container style={{ paddingTop: 10 }} className="container">
        <Link style={{ textDecoration: "none" }} to={"/employees/new"}>
          <Button
            style={{ marginBottom: 30 }}
            variant="contained"
            color="primary"
          >
            Add new Employee
          </Button>
        </Link>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Date of birth</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{employeeList}</TableBody>
        </Table>
      </Container>
    </div>
  );
}
export default EmployeeTable;
