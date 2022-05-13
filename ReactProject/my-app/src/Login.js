import React,{useEffect, useState, useContext} from 'react';
import {Button,FormGroup,FormControl, OutlinedInput, InputLabel, Box } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import PasswordIcon from '@mui/icons-material/Password';
import {Link,useNavigate} from 'react-router-dom';


function Login(){

    const [user,setUser] = useState({
        username: "",
        password: ""
    });

    const [isLogged,setLogged] = useState(false);

    const navigate = useNavigate();

    //const  _setUser  = useContext(UserContext);
    
    const handleChange = (event) => {
        setUser({...user, [event.target.id]:event.target.value})
    }
  
    async function handleSubmit(e){
        e.preventDefault();
        await fetch('/api/login',{
            method: 'POST',            
            headers: { 
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            setLogged(data.auth)   
            localStorage.setItem('token', data.token)
        })
        navigate("/employees")
    }

    return (
        <div>
            <Box
                m="auto"
                component="form"
                sx={{  
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '200pt',
                    height: '400pt',
                    '& .MuiTextField-root': { p:5 ,m: 1, width: '15ch' },
                }}
                noValidate
                autoComplete="off"
            >   
            <FormControl margin='normal'>
                <InputLabel htmlFor="username">Enter Username:</InputLabel>
                <OutlinedInput
                    id="username"
                    value={user.username || ''}
                    onChange={handleChange}
                    label="Username"
                    size='small'
                    
                />
            </FormControl>
            <FormControl margin='normal'>
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
            <FormGroup margin='normal' >
            <Button  variant='contained' startIcon={<LoginSharpIcon/>} color="primary" onClick={(e)=>handleSubmit(e)}>LogIn</Button> 
            <p>Not registered yet? <Link to='/registration'> Do It Now!</Link></p>
            </FormGroup>
            </Box>           
        </div>       
    )
}

export default Login 