import React,{useEffect, useState} from 'react';
import {Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {Button} from "@mui/material"



function Login(){

    const [user,setUser] = useState({
        username: "",
        password: ""
    });

    const [isLogged,setLogged] = useState(false)

    
    // var user = {
    //     username: "",
    //     password: ""
    // }
    
    function handleChange(event)  {
        console.log(event.target.name)
        console.log(event.target.value)
        setUser({...user, [event.target.name]:event.target.value})
    }
  
    async function handleSubmit(e){
        e.preventDefault();
        console.log("works")
        await fetch('/api/login',
            {
            //mode:'cors',
            method: 'POST',
            //credentials: 'include',
            
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
        console.log("User log in")
    }

    return (
        <div>
            <header className="App-header">
                My first React-Node CRUD App
            </header>
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
            <p>Not registered yet? <a href='/registration'> Do It Now!</a></p>

            {isLogged && <Button href='/home'>Check if Authenticated </Button>}
            </Container>         
        </div>
    )

}

export default Login 