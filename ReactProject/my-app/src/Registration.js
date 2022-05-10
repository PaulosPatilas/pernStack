import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';

function Registration(){

    const [user,setUser] = useState({
      username:"",
      password:""
    })
    
    async function handleSubmit(){

      await fetch('/api/registration',
      {
       // mode:'cors',
        method: 'POST',
        headers: { 
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body:JSON.stringify(user)
      })
      console.log('ADD is in progress...')
      // .then(response => {
      //   console.log(response);
      //   return response.json()
      // })
      console.log('ADD IS DONE')
    }

    function handleChange(event)  {
      console.log(event.target.name)
      console.log(event.target.value)
      setUser({...user, [event.target.name]:event.target.value})
    }

    return(
        <div>
        <header className="App-header">
          My first React-Node CRUD App
        </header>
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
                <Button outline color="primary" type="submit">Sign Up</Button>
                <Button outline color="secondary" href="/">Cancel</Button>
              </FormGroup>
            </Form>
          </Container>
        </div>
    )

}

export default Registration