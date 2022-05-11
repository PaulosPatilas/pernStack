import React,{useState,useEffect, useRef} from 'react'
import EmployeeRow from './EmployeeRow';
import{Table} from 'reactstrap';
import { Link } from 'react-router-dom';
import {ButtonGroup,Button} from '@mui/material';

function EmployeeTable() {
    
  const [employees,setEmployees] = useState([]);

  useEffect(() => {   
    fetch('api/employees', {
      headers:{
        'x-access-token': localStorage.getItem("token")
      }
    })
    .then(response => {
      return response.json()
    })
    .then((result) => {
      setEmployees(result);
    })
  },[]);
        

  async function handleDeleteClick(id){   
    await fetch(`api/employee/${id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': localStorage.getItem("token"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      let updatedEmployees = [...employees].filter(i => i.id !== id);
      setEmployees(updatedEmployees);
    });
  }

  const employeeList = employees.map(employee => {
    return (
      <tr key={employee.id}>
      <EmployeeRow edit={true} id={employee.id} LastName={employee.last_name} FirstName={employee.first_name} BirthDate={employee.date_of_birth.substring(0,10)} is_active={employee.is_active} />
      <ButtonGroup>
        <Button variant='outlined' color='warning' onClick={()=> handleDeleteClick(employee.id)}>Delete</Button>
        <Link to={"/employees/" + employee.id}><Button variant='outlined' color='secondary'>Update</Button></Link>      
      </ButtonGroup>      
      </tr>       
    )}
  );

  return (
    <div>
      <div style={{paddingTop: 10}} className='container'>
        <Link to={'/employees/new'}><Button fullWidth style={{marginBottom: 30}} variant='contained' color='primary'>Add new Employee</Button></Link>         
        <Table bordered>
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Date of birth</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeList}    
          </tbody>
        </Table>
      </div>
      <Link to={'/'}><Button color='warning' onClick={()=>{localStorage.removeItem("token")}}>LogOut</Button></Link> 
    </div>
  )   
}
  export default EmployeeTable
