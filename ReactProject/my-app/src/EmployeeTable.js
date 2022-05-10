import React,{useState,useEffect, useRef} from 'react'
import EmployeeRow from './EmployeeRow';
import{Table} from 'reactstrap';
import { Link } from 'react-router-dom';
import {ButtonGroup,Button} from '@mui/material';

function EmployeeTable() {
    
  const [employees,setEmployees] = useState([]);

  useEffect(() => {
    
      fetch('api/employees', {
        //mode:'cors',
        headers:{
        "x-access-token": localStorage.getItem("token")
        }
      })
      .then(response => {
        return response.json()
      })
      .then((result) => {
        setEmployees(result);
        console.log(result);
      })
    
  },[]);
         //THELEI mode:'cors'
  async function handleDeleteClick(id){
    console.log(id);
    await fetch(`api/employee/${id}`, {
      method: 'DELETE',
      
      headers: {
        "x-access-token": localStorage.getItem("token"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      }).then(() => {
          //vriskw ola ta employees pou den exoun auto to id etsi kai na allaksw to state me ayta wste na diwksw to ena
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
         <Button variant='outlined' color='secondary' href={"/employees/" + employee.id}>Update</Button>      
        </ButtonGroup>      
        </tr>       
    )});

    return (
      <div className="App">
      <header className="App-header">
        My first React-Node CRUD App
      </header>
      <div style={{paddingTop: 10}} className='container'>
         <Button fullWidth style={{marginBottom: 30}} variant='contained' color='primary' href = {"/employees/new"}>Add new Employee</Button> 
        
        <Table  bordered>
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
      
      <Button color='warning' onClick={()=>{localStorage.removeItem("token")}} href= {"/"}>LogOut</Button>
      
      </div>
      )
    
}
  export default EmployeeTable
