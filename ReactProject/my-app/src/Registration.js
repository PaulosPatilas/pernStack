import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Button,FormControl, OutlinedInput, InputLabel, Box, InputAdornment } from "@mui/material"

function Registration(){

  const [user,setUser] = useState({
    username:"",
    password:""
  })
    
  async function handleSubmit(){
    await fetch('/api/registration',{
      method: 'POST',
      headers: { 
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body:JSON.stringify(user)
    })
  }

  function handleChange(event)  {
    setUser({...user, [event.target.id]:event.target.value})
  }

  return(
    <div>
      <Box
        component="form"
        sx={{
              display:'block',
              flexDirection:'column',
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >   
            <FormControl margin='dense'>
                <InputLabel htmlFor="username">Enter Username:</InputLabel>
                <OutlinedInput
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
                    id="password"
                    type='password'
                    size='small'
                    label='Password'
                    value={user.password || ''}
                    onChange={handleChange}
                />
            </FormControl>
            </Box> 
    
    <Link to='/login'><Button variant='outlined' color="primary" type="submit">Sign Up</Button></Link>
    <Link to='/'><Button variant='outlined' color="secondary">Cancel</Button></Link>
    </div>
  )
}
export default Registration