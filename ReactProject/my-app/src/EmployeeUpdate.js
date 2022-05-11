import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {  Form, FormGroup, Input, Label } from 'reactstrap';
import {Container,Button,Checkbox} from '@mui/material';
import './EmployeeUpdate.css';


function EmployeeUpdate() {

  const emptyEmployee = {
    id:0,
    last_name:'',
    first_name:'',
    date_of_birth:'',
    is_active:''
  };


  const [employee,setEmployee] = useState(emptyEmployee);
  const [checked, setChecked] = useState(false);
  const  params = useParams();
  const navigate = useNavigate();


  useEffect(async () => {
    const id = params.id;
    
    await fetch(`/api/employee/${id}`, {
      //mode:'cors',
      headers:{
      'x-access-token':localStorage.getItem("token"),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then((result) => {
      setEmployee(result[0]); 
      setChecked(result[0].is_active); 
    })
  },[]);

  function handleChange(event)  {
    setEmployee({...employee,[event.target.name]:event.target.value})
  }

  async function handleSubmit(e){

    e.preventDefault();
    
    setEmployee(employee.is_active = checked);
    
    employee.date_of_birth = employee.date_of_birth.substring(0,10);
        
    await fetch(`/api/employee/${employee.id}`,
    {
      //mode:'cors',
      method: 'PUT',
      headers: { 
        'accept': 'application/json',
        'x-access-token':localStorage.getItem("token"),
        'content-type': 'application/json'
      },
      body:JSON.stringify(employee)
    })
    navigate('/employees')
  }
  

  return(
    <div>
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
            <Button variant="contained"  color="primary" type="submit">Save</Button>
            <Button variant="outlined" color="secondary" onClick={()=>{navigate('/employees')}}>Cancel</Button>
          </FormGroup>
        </Form>
      </Container>       
    </div>
  )

}
export default EmployeeUpdate;