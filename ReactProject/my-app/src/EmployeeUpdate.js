import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import {  useRouter } from 'next/router';
import moment from 'moment';
import {ButtonGroup,Button,TextField,FormLabel,FormControlLabel,Checkbox,Box,FormControl,InputLabel,Input,FormGroup} from '@mui/material';
import './EmployeeUpdate.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';




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
  //const router = useRouter();
  const [value, setValue] = useState();

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  function getEmployee(id) {
    fetch(`/api/employee/${id}`,{
      method:'GET',
      headers:{
      'x-access-token':localStorage.getItem("token"),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then((result)=>{
      setEmployee(result[0]); 
      console.log(employee)
      setChecked(result[0].is_active); 
      setValue(result[0].date_of_birth)
    })
  }

  useEffect(() => {
    const id = params.id
    getEmployee(id);
    
    console.log('DONE');
  }
  ,[]);

  function handleChange(event)  {
    setEmployee({...employee,[event.target.id]:event.target.value})
  }

  async function handleSubmit(e){

    e.preventDefault();

    if(employee.first_name == '' || employee.last_name == ''){

    }
    else{
      setEmployee(employee.is_active = checked);
      setEmployee(employee.date_of_birth = value);
      console.log(employee);  
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
  }

  return(
    <div>
      <h1 style={{ textAlign: "center" , font:14}}>Edit {employee.first_name}  {employee.last_name} Profile!</h1>

      <Box 
          m='auto'
          sx={{
            width: 200,
            height: 400
        }}
      >
        <div>
        <FormControl margin="normal">
            <InputLabel htmlFor="last_name">Enter Last Name:</InputLabel>
                <Input
                    id="last_name"
                    value={employee.last_name}
                    onChange={handleChange}
                    label="last_name"
                    size='small'
                />
        </FormControl>
        <FormControl margin="normal">
            <InputLabel htmlFor="first_name">Enter First Name:</InputLabel>
                <Input
                    id="first_name"
                    value={employee.first_name}
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
              value={value}            
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
            {/* <InputLabel htmlFor="date_of_birth">Enter Date of Birth:</InputLabel> */}
             {/* <Input
                    id="date_of_birth"
                    value={moment(new Date(employee.date_of_birth?.substring(0,10))).format('DD-MM-YYYY')}
                    //placeholder='dd-mm-yyyy
                    onChange={handleChange} 
                    label="date_of_birth"                    
                    type="date"
                /> */}
        </FormControl>
        <FormControl>
          <FormGroup>
             {/* <FormControlLabel htmlFor="is_active">Activity</FormControlLabel>  */}
                <FormControlLabel                                   
                    id="is_active"
                    control={<Checkbox />}
                    labelPlacement="start"
                    label='Activity'
                    value={employee.is_active}
                    onChange={(event) => setChecked(event.target.checked)}
                    name = 'is_active'
                    size='small'
                    checked ={checked}
                />
              </FormGroup>
        </FormControl>
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
      </Container>        */}
    </div>
  )

}
export default EmployeeUpdate;