import React,{useEffect, useState, useContext} from 'react';
import {Button,FormControl, OutlinedInput, InputLabel, Box } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
            {/* <h1 style={{ textAlign: "center" , font:14}}>Log In</h1>
            <Container> 
            <Form onSubmit={(e)=> handleSubmit(e)}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" value={user.username || ''}
                    onChange={(e) => {handleChange(e)}} autoComplete="username"/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" value={user.password || ''}
                    onChange={(e) => {handleChange(e)}} autoComplete="password"/>
                </FormGroup>          
                <Button variant='outlined' color="primary" type="submit">LogIn</Button> 
            </Form>
            <p>Not registered yet? <Link to='/registration'> Do It Now!</Link></p>
            </Container>  */}
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
            <Button variant='outlined' color="primary" onClick={(e)=>handleSubmit(e)}>LogIn</Button> 
            <p>Not registered yet? <Link to='/registration'> Do It Now!</Link></p>
            </div>
        
    )

}

export default Login 