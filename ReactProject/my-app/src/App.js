import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useState,  useEffect } from 'react';
import { UserContext } from "./UserContext";
import {Button} from '@mui/material'
import Login from './Login';
import Registration from './Registration';
import EmployeeTable from './EmployeeTable';
import EmployeeAddition from './EmployeeAddition';
import EmployeeUpdate from './EmployeeUpdate';
import logo from './logo.svg';


function App() {

  const [isLogged, setLogged] = useState(null);


  useEffect(()=>{ 
    if(localStorage.getItem("token") !== null){
      setLogged(true)
    }
    else {setLogged(false)}
  },[])
    
  return ( 
    <div className='App'>
      <header className='App-header'>My first React-Node CRUD App {!isLogged && <Link className='App-link' to='/login'><Button color='secondary' onClick={()=>{window.scrollTo(0, 450)}} variant='text'>LOG IN</Button></Link>}
      {!isLogged && <img src={logo} className="App-logo" alt="logo" />}
      </header>
      <Routes>
        <Route path="/login" element={<Login/>}/> 
        <Route path ="/registration" element={<Registration/>}/>
        <Route path="/employees" element={<EmployeeTable/>}/>
        <Route path="/employees/new" element={<EmployeeAddition/>}/>
        <Route path="/employees/:id" element={<EmployeeUpdate/>}/>
      </Routes>
    </div> 
    
  );
}

export default App;
