import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {ButtonGroup,Button,Checkbox,TextField,FormControlLabel,Box,FormControl,InputLabel,Input,FormGroup} from '@mui/material';
import './EmployeeAddition.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment'


function EmployeeAddition() {
    
  const emptyEmployee = {
    id:0,
    last_name:'',
    first_name:'',
    date_of_birth:'',
    is_active:''
  };

  const [newEmployee,setEmployee] = useState(emptyEmployee);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState();

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  function handleChange(event)  {
    setEmployee({...newEmployee, [event.target.id]:event.target.value})
  }

  async function handleSubmit(e){

    e.preventDefault();

    console.log(newEmployee.is_active);
    if (newEmployee.first_name == "" || newEmployee.last_name == "" ){ //|| newEmployee.date_of_birth == ""
      alert('Please complete the fields first')
      return;
    }
    else {
      setEmployee(newEmployee.is_active=checked);
      setEmployee(newEmployee.date_of_birth=value);
      await fetch(`/api/employee/new`,
      {
        method: 'POST',        
        headers: { 
          'accept': 'application/json',
          'x-access-token': localStorage.getItem("token"),
          'content-type': 'application/json'
        },
        body:JSON.stringify(newEmployee)
      })
      navigate('/employees')
      }
    }


  return (
    <div>
      <h1 style={{ textAlign: "center" , font:14}}>Add new Employee</h1>
      <Box 
          m='auto'
          sx={{
            width: 200,
            height: 400,
          
        }}
      >
        <div>
        <FormControl margin="normal">
            <InputLabel htmlFor="last_name">Enter Last Name:</InputLabel>
                <Input
                    id="last_name"
                    value={newEmployee.last_name || ''}
                    onChange={handleChange}
                    label="last_name"
                    size='small'    
                />
        </FormControl>
        <FormControl margin="normal">
            <InputLabel htmlFor="first_name">Enter First Name:</InputLabel>
                <Input
                    id="first_name"
                    value={newEmployee.first_name || ''}
                    onChange={handleChange}
                    label="first_name"
                    size='small'
                    
                />
        </FormControl>
        <FormControl margin="normal" size='normal'>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              id="date_of_birth"
              label="Date of Birth"
              inputFormat="DD-MM-YYYY"
              value={value || ''}            
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
            {/* <InputLabel htmlFor="date_of_birth">Enter Date of Birth:</InputLabel> */}
                {/* <Input
                    id="date_of_birth"
                    value={newEmployee.date_of_birth?.substring(0,10) || ''}
                    onChange={handleChange}
                    label="date_of_birth"
                    type="date"
                /> */}
        </FormControl>
        <FormGroup>
        <FormControl margin="small">
          <FormControlLabel                                   
                    id="is_active"
                    control={<Checkbox />}
                    labelPlacement="start"
                    label='Activity'
                    value={newEmployee.is_active}
                    onChange={(event) => setChecked(event.target.checked)}
                    name = 'is_active'
                    size='small'
                    checked ={checked}
                />
        </FormControl>
        </FormGroup>
        </div>
        <ButtonGroup>
        <Button variant="contained"  color="primary" onClick={(e)=>handleSubmit(e)}>Save</Button>
        <Button variant="outlined" color="secondary" onClick={()=>{navigate('/employees')}}>Cancel</Button>
        </ButtonGroup>
      </Box>
      {/* <Container> 
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
            <Button  variant='contained' color="primary" type="submit">Add</Button>
            <Link to={'/employees'}><Button variant='outlined' color="secondary">Cancel</Button></Link>
          </FormGroup>
        </Form>
      </Container>        */}
    </div>
  )        
}    

export default EmployeeAddition; 