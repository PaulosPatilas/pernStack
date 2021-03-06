import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  OutlinedInput,
  InputLabel,
  Box
} from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";


function Login(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [status, setStatus] = useState(false);
  const [errorMessage, seterrorMessage] = useState();

  const {
    isLogged: [isLogged, setLogged],
  } = { isLogged: useState(false), ...(props.state || {}) };

  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/employees")
    }
  },[])

  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submiting")
    await fetch("/api/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth) {
          console.log(data);
          setStatus(true);
          localStorage.setItem("token", data.token);
          navigate("/employees");
          setLogged(true);
        } else {
          console.log(
            "data.auth: " + data.auth + " data.message: " + data.message
          );
          setStatus(data.auth);
          seterrorMessage(data.message);
        }
      });
    console.log("Auth is " + status + " message is " + errorMessage);
  }

  return (
      <form onSubmit={handleSubmit}>
      <Box
        m="auto"
        component="form"
        sx={{
          marginTop: 15,
          alignItems: "center",
          justifyContent: "center",
          width: "170pt",
          height: "400pt",
          "& .MuiTextField-root": { p: 5, m: 1, width: "15ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {!status ? <p style={{ color: "red" }}>{errorMessage}</p> : ""}
        <FormControl margin="normal">
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput
            id="username"
            value={user.username || ""}
            onChange={handleChange}
            label="Username"
            size="small"
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type="password"
            size="small"
            label="Password"
            value={user.password || ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormGroup margin="normal">
          <Button
            type="submit"
            variant="contained"
            startIcon={<LoginSharpIcon />}
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            LogIn
          </Button>
          <Link to="/restoration">Forgot your password?</Link>
          <p>
            Not registered yet? <Link to="/registration"> Do It Now!</Link>
          </p>
        </FormGroup>
      </Box>
      </form>
    
  );
}

export default Login;
