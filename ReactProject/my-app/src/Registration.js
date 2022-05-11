import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';

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
    setUser({...user, [event.target.name]:event.target.value})
  }

  return(
    <div>
      <h1 style={{ textAlign: "center" , font:14}}>Add new user</h1>
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
          <FormGroup>
            <Link to='/login'><Button outline color="primary" type="submit">Sign Up</Button></Link>
            <Link to='/'><Button outline color="secondary">Cancel</Button></Link>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
}

export default Registration