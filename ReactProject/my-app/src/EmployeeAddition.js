import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ButtonGroup,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  Box,
  FormControl,
  InputLabel,
  Input,
  FormGroup,
} from "@mui/material";
import "./EmployeeAddition.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

function EmployeeAddition() {
  const emptyEmployee = {
    id: 0,
    last_name: "",
    first_name: "",
    date_of_birth: "",
    is_active: "",
  };

  const [newEmployee, setEmployee] = useState(emptyEmployee);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState();

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  function handleChange(event) {
    setEmployee({ ...newEmployee, [event.target.id]: event.target.value });
  }

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(newEmployee.date_of_birth);
    if (
      newEmployee.first_name == "" ||
      newEmployee.last_name == "" ||
      value == ""
    ) {
      alert("Please complete the fields first");
      return;
    } else {
      setEmployee((newEmployee.is_active = checked));
      setEmployee((newEmployee.date_of_birth = value));
      console.log(newEmployee.date_of_birth);
      await fetch(`/api/employee/new`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-access-token": localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });
      navigate("/employees");
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", font: 14 }}>Add new Employee</h1>
      <Box
        m="auto"
        sx={{
          width: 200,
          height: 400,
        }}
      >
        <div>
          <FormControl margin="normal">
            <InputLabel htmlFor="last_name">Enter Last Name:</InputLabel>
            <Input
              id="last_name"
              value={newEmployee.last_name || ""}
              onChange={handleChange}
              label="last_name"
              size="small"
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="first_name">Enter First Name:</InputLabel>
            <Input
              id="first_name"
              value={newEmployee.first_name || ""}
              onChange={handleChange}
              label="first_name"
              size="small"
            />
          </FormControl>
          <FormControl margin="normal" size="normal">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                id="date_of_birth"
                label="Date of Birth"
                inputFormat="DD-MM-YYYY"
                value={value || ""}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormGroup style={{alignContent: 'center'}}>
            <FormControl margin="normal">
              <FormControlLabel
                id="is_active"
                control={<Checkbox />}
                labelPlacement="start"
                label="Activity"
                value={newEmployee.is_active}
                onChange={(event) => setChecked(event.target.checked)}
                name="is_active"
                size="small"
                checked={checked}
              />
            </FormControl>
          </FormGroup>
        </div>
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              navigate("/employees");
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
}

export default EmployeeAddition;
