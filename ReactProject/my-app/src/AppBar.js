import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

export default function ButtonAppBar(props) {
  const {
    isLogged: [isLogged, setLogged],
  } = { isLogged: useState(), ...(props.state || {}) };

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setLogged(false);
    navigate("/login")
    console.log("redirecting...")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Crud App
          </Typography>
          {!isLogged && (
            <Link className="App-link" to="/login">
              <Button style={{ color: "white" }}>Log In</Button>
            </Link>
          )}
          {isLogged && (
            <Link
              className="App-link"
              style={{ textDecoration: "none" }}
              to={"/"}
              onClick={() => {
                handleLogout();
              }}
            >
              <Button
                id="logout"
                //className='App-LogOut'
                endIcon={<LogoutSharpIcon />}
                style={{ color: "white" }}
              >
                LogOut
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
