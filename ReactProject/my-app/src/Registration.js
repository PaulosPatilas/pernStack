import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Button,FormControl, OutlinedInput, InputLabel, Box, InputAdornment } from "@mui/material"

function Registration(){

  const [user,setUser] = useState({
    username:"",
    password:""
  })
    
  async function handleSubmit(){
    if (user.password == "" || user.username == ""){
      alert("Είναι απαραίτητο να συμπληρώσετε τα στοιχεία σας");
    }
    else {
    await fetch('/api/registration',{
      method: 'POST',
      headers: { 
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body:JSON.stringify(user)
    })
  }}

  function handleChange(event)  {
    setUser({...user, [event.target.id]:event.target.value})
  }

  return(
    <div>
        <form id="regForm" >
        <Box
            margin='auto'
            component="form"
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '200pt',
              height: '400pt',
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >   
            <FormControl margin='dense'>
                <InputLabel htmlFor="username">Enter Username:</InputLabel>
                <OutlinedInput
                    required
                    id="username"
                    value={user.username || ''}
                    onChange={handleChange}
                    label="Username"
                    size='small'
                    margin='dense'
                />
            </FormControl>
            <FormControl margin='dense'>
                <InputLabel htmlFor='password'>Enter passsword:</InputLabel>
                <OutlinedInput
                    required
                    id="password"
                    type='password'
                    size='small'
                    label='Password'
                    value={user.password || ''}
                    onChange={handleChange}
                />
            </FormControl>
            <Link to='/login'><Button variant='outlined' color="primary" form='regForm' onClick={() => handleSubmit()}>Sign Up</Button></Link>
            <Link to='/'><Button variant='outlined' color="secondary">Cancel</Button></Link>
            </Box>           
        </form>
    </div>
    
  )
}
export default Registration