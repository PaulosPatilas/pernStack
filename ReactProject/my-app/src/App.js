import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from "./UserContext";
import Login from './Login';
import Registration from './Registration';
import EmployeeTable from './EmployeeTable';
import EmployeeAddition from './EmployeeAddition';
import EmployeeUpdate from './EmployeeUpdate';


function App() {

  const [user, setUser] = useState(null);

  return ( 
    <div className='App'>
      <header className='App-header'>My first React-Node CRUD App<Link className='App-link' to='/login'>Click Here to Log in</Link></header>
      <h1>Welcome to React!</h1>
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
