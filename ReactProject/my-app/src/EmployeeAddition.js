import React,{useEffect, useState} from 'react';
import {  Form, FormGroup, Input, Label} from 'reactstrap';
import { Link } from "react-router-dom";
import {Button, Container} from '@mui/material';
import './EmployeeAddition.css';

function EmployeeAddition() {
    
  var emptyEmployee = {
    id:0,
    last_name:'',
    first_name:'',
    date_of_birth:'',
    is_active:''
  };

  const [newEmployee,setEmployee] = useState(emptyEmployee);
  const [checked, setChecked] = useState(false);
    // useEffect(() => {
    //     console.log (`You clicked ${count} times`);
    // });


  function handleChange(event)  {
    console.log(event.target.name)
    console.log(event.target.value)
    setEmployee({...newEmployee, [event.target.name]:event.target.value})
    }

  async function handleSubmit(e){

    //e.preventDefault();
    console.log(newEmployee.is_active);
    if (newEmployee.first_name == "" || newEmployee.last_name == "" || newEmployee.date_of_birth == ""){
      alert('Please complete the fields first')
      return;
    }
    else {
      setEmployee(newEmployee.is_active=checked);
      await fetch(`api/employee`,
      {
        //mode:'cors',
        method: 'POST',
        
        headers: { 
          'accept': 'application/json',
          "x-access-token": localStorage.getItem("token"),
          'content-type': 'application/json'
        },
        body:JSON.stringify(newEmployee)
      })
      console.log('ADD is in progress...')
        // .then(response => {
        //   console.log(response);
        //   return response.json()
        // })
      console.log('ADD IS DONE')
      }
    }


  return (
      <div>
      <header className="App-header">
        My first React-Node CRUD App
      </header>
      <h1 style={{ textAlign: "center" , font:14}}>Add new Employee</h1>
        <Container> 
          <Form onSubmit={(e)=> handleSubmit(e)}>
            <FormGroup>
              <Label for="firstname">Firstname</Label>
              <Input type="text" name="first_name" id="firstname" value={newEmployee.first_name || ''}
                onChange={(e) => {handleChange(e)}} autoComplete="firstname"/>
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Lastname</Label>
              <Input type="text" name="last_name" id="lastname" value={newEmployee.last_name || ''}
                onChange={(e) => {handleChange(e)}} autoComplete="lastname"/>
            </FormGroup>          
            <FormGroup>
              <Label for="age">Date of Birth</Label>
              <Input type="date" name="date_of_birth" id="age" value={newEmployee.date_of_birth || ''}
                onChange={(e) => {handleChange(e)}} autoComplete="age"/>
            </FormGroup>
            <FormGroup check inline>
              <Label for="isActive">Active</Label>
              <Input type="checkbox" name="is_active" id="isActive" value={true || ''}
                onChange={() => setChecked(!checked)} autoComplete="isActive"/>
            </FormGroup>
            <FormGroup>
              <Button className='Add-Button' variant='contained' color="primary" type="submit">Add</Button>
              <Button variant='outlined' color="secondary" href="/home">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>       
      </div>
    )        
}    

export default EmployeeAddition; 