import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  Box,
  InputAdornment,
} from "@mui/material";


function Registration() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [errorMessage, seterrorMessage] = useState("");
  const [validateMessage, setvalidateMessage] = useState("");
  const [status, setStatus] = useState(false);

  async function handleSubmit() {
    setStatus(false);
    if (user.password == "" || user.username == "") {
      alert("Είναι απαραίτητο να συμπληρώσετε τα στοιχεία σας");
    } else {
      await fetch("/api/registration", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.status) {
            setStatus(data.status);
            seterrorMessage(data.message);
          } else {
            setStatus(data.status);
            setvalidateMessage(data.message);
            //navigate('/login')}
          }
        });
    }
  }

  async function handleResent(){
    await fetch(`/api/resent`,{
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(user)
    }).then((response)=>{response.json()});
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  return (
    <div>
      <form id="regForm">
        <Box
          margin="auto"
          component="form"
          sx={{
            marginTop: 15,
            alignItems: "center",
            justifyContent: "center",
            width: "200pt",
            height: "400pt",
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {!status && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}     
          {status && (
            <div>
              <p>{validateMessage}</p>
              <Button onClick={()=>handleResent()}>Resent</Button>
            </div>
          )}
          <FormControl margin="normal">
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              required
              id="username"
              value={user.username || ""}
              onChange={handleChange}
              label="Username"
              size="small"
              margin="dense"
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="password">Passsword</InputLabel>
            <OutlinedInput
              required
              id="password"
              type="password"
              size="small"
              label="Password"
              value={user.password || ""}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              required
              id="email"
              type="email"
              size="small"
              label="Email"
              value={user.email || ""}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            style={{ marginTop: 8, marginRight: 9 }}
            variant="outlined"
            color="primary"
            form="regForm"
            onClick={() => handleSubmit()}
          >
            Sign Up
          </Button>
          <Link style={{ textDecoration: "none" }} to="/">
            <Button
              style={{ marginTop: 8 }}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
}
export default Registration;
