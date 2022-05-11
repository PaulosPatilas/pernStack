import React,{useEffect, useState, useContext} from 'react';
import {Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {Button} from "@mui/material"
import { UserContext } from "./UserContext";
import {Link,useNavigate} from 'react-router-dom';

function Login(){

    const [user,setUser] = useState({
        username: "",
        password: ""
    });

    const [isLogged,setLogged] = useState(false);

    const navigate = useNavigate();

    //const  _setUser  = useContext(UserContext);
    
    function handleChange(event)  {
        setUser({...user, [event.target.name]:event.target.value})
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
            <h1 style={{ textAlign: "center" , font:14}}>Log In</h1>
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
            </Container>             
        </div>
    )

}

export default Login 