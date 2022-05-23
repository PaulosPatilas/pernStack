import "./App.css";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Button } from "@mui/material";
import Login from "./Login";
import Registration from "./Registration";
import EmployeeTable from "./EmployeeTable";
import EmployeeAddition from "./EmployeeAddition";
import EmployeeUpdate from "./EmployeeUpdate";
import ButtonAppBar from "./AppBar";
import RestorePassword from "./RestorePassword";
import ResetPassword from "./ResetPassword";
import Confirmation from "./confirmation";
import { AppBar } from "@mui/material";

function App() {
  const [isLogged, setLogged] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogged(true);
    } 
    else if(!(localStorage.getItem("babino")) && !(localStorage.getItem("vasilakos"))){
      navigate("/login")
    }
    // else {
    //   //setLogged(false);
    //   console.log(location.pathname)
    //   navigate("/login");
    // }
  }, [isLogged]);

  return (
    <div className="App">
      <ButtonAppBar state={{ isLogged: [isLogged, setLogged] }} />
      <Routes>
        <Route path="/" element={<AppBar />} />
        <Route
          path="/login"
          element={<Login state={{ isLogged: [isLogged, setLogged] }} />}
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/employees" element={<EmployeeTable />} />
        <Route path="/employees/new" element={<EmployeeAddition />} />
        <Route path="/employees/:id" element={<EmployeeUpdate />} />
        <Route
          path="/confirmation/:confirmationCode"
          element={<Confirmation />}
        />
        <Route path="/restoration" element={<RestorePassword />} />
        <Route
          path="/restoration/:confirmationCode"
          element={<ResetPassword />}
        />
      </Routes>
    </div>
  );
}

export default App;