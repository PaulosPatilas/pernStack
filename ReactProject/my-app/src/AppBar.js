import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { style } from "@mui/system";

export default function ButtonAppBar(props) {
    const {
        isLogged:[isLogged,setLogged]
      } = {isLogged:useState(false),
          ...(props.state || {})
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
          {!isLogged &&
          <Button
            color="secondary"
            onClick={() => {
                //style.visibility = 'hidden'
                window.scrollTo(0, 450);
                //setLogged(true);
            }}
            >
            <Link className="App-link" to="/login">
             Log In 
            </Link>
          </Button>
        }{isLogged && 
          <Button 
            //className='App-LogOut' 
            endIcon={<LogoutSharpIcon/>} 
            //style={{marginTop: 30}} 
            //variant='text' 
            //color= 'secondary'
            onClick={()=>{
              localStorage.removeItem("token"); 
              setLogged(false)
            }}>
            <Link className="App-link" style={{textDecoration:'none'}} to={'/'}>
              LogOut
            </Link>
          </Button>}

        </Toolbar>
      </AppBar>
    </Box>
  );
}