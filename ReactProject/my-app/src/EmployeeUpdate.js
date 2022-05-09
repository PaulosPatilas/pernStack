import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {  Form, FormGroup, Input, Label } from 'reactstrap';
import {Container,Button,Checkbox} from '@mui/material';
import './EmployeeUpdate.css';


function EmployeeUpdate() {

  var emptyEmployee = {
    id:0,
    last_name:'',
    first_name:'',
    date_of_birth:'',
    is_active:''
  };


  const [employee,setEmployee] = useState(emptyEmployee);
  const [checked, setChecked] = useState(false);
  const  params = useParams();

  

  // async function fetchData() {
  //   await fetch(`api/employee/${id}`, {
  //     //mode:'cors',
  //     headers:{
  //     "x-access-token":localStorage.getItem("token")
  //     }
  //   })
  //   .then(response => {
  //     return response.json()
  //   })
  // }

  useEffect(async () => {
    const id = params.id;
    console.log('useEffect is Working...')
    await fetch(`/api/employee/${id}`, {
      //mode:'cors',
      headers:{
      "x-access-token":localStorage.getItem("token"),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    })
    .then(response => {
      //console.log(response.json());
      return response.json();
    })
    .then((result) => {
      console.log('asdasd')
      console.log(result);
      setEmployee(result[0]); 
      setChecked(result[0].is_active);
      
    })
    //console.log(employee);
    console.log(checked);
  },[]);

  function handleChange(event)  {
    setEmployee({...employee,[event.target.name]:event.target.value})
  }

  async function handleSubmit(e){

    //e.preventDefault();
    
    setEmployee(employee.is_active = checked);
    
    employee.date_of_birth = employee.date_of_birth.substring(0,10);
    console.log('HandleSubmit is Working for Employee:'+ JSON.stringify(employee));
    
    await fetch(`/api/employee/${employee.id}`,
    {
      //mode:'cors',
      method: 'PUT',
      headers: { 
        'accept': 'application/json',
        "x-access-token":localStorage.getItem("token"),
        'content-type': 'application/json'
      },
      body:JSON.stringify(employee)
    })
    console.log('Update is in progress...' + JSON.stringify(employee))
    // .then(response => {
    //   console.log(response);
    //   return response.json()
    // })
    console.log('Update is DONE')
  }
  

  return(
    <div>
      <header className="App-header">
        My first React-Node CRUD App
      </header>
      <h1 style={{ textAlign: "center" , font:14}}>Edit {employee.first_name}  {employee.last_name} Profile!</h1>
      <Container> 
        <Form onSubmit={(e)=> handleSubmit(e)}>
          <FormGroup>
            <Label for="firstname">Firstname</Label>
            <Input required type="text" name="first_name" id="firstname" value={employee.first_name}
              onChange={(e) => {handleChange(e)}} autoComplete="firstname"/>
          </FormGroup>
          <FormGroup>
            <Label for="lastname">Lastname</Label>
            <Input required type="text" name="last_name" id="lastname" value={employee.last_name}
              onChange={(e) => {handleChange(e)}} autoComplete="lastname"/>
            </FormGroup>          
            <FormGroup>
              <Label for="age">Date of Birth</Label>
              <Input required type="date" name="date_of_birth" id="age" value={employee.date_of_birth.substring(0,10)}
                onChange={(e) => {handleChange(e)}} autoComplete="age"/>
            </FormGroup>
            <FormGroup check inline>
              <Label for="isActive">Active</Label>
              <Checkbox type="checkbox" name="is_active" id="isActive" checked={checked} value={checked ? 'Yes' : 'No'}
                onChange={(event) => setChecked(event.target.checked)} autoComplete="isActive"/>
            </FormGroup>
            <FormGroup>
              <Button variant="contained"  color="primary"   type="submit">Save</Button>{/*href="/home" if i href this button submit doesnt work*/}
              <Button variant="outlined"  color="secondary" href={"/home"}>Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
       
      </div>
    )

}
export default EmployeeUpdate;