import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Button } from "@mui/material";
import Login from "./Login";
import Registration from "./Registration";
import EmployeeTable from "./EmployeeTable";
import EmployeeAddition from "./EmployeeAddition";
import EmployeeUpdate from "./EmployeeUpdate";
import ButtonAppBar from "./AppBar";
import logo from "./logo.svg";


function App() {
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    localStorage.removeItem("token");
    // if (localStorage.getItem("token") !== null) {
    //   setLogged(true);
    // } else {
    //   setLogged(false);
    // }
  },[]);



  return (
    <div className="App">
      <ButtonAppBar state={{isLogged: [isLogged, setLogged]}}/>
      <Routes>
        <Route path="/login" element={<Login state={{isLogged: [isLogged, setLogged]}}/>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/employees" element={<EmployeeTable />} />
        <Route path="/employees/new" element={<EmployeeAddition />} />
        <Route path="/employees/:id" element={<EmployeeUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
