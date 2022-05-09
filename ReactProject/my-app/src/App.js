import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import EmployeeUpdate from './EmployeeUpdate';
import EmployeeTable from './EmployeeTable';
import EmployeeAddition from './EmployeeAddition';
import Registration from './Registration';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact={true} path='/home' element={<EmployeeTable/>}/>
        <Route exact={true} path='/employeeupd/:id' element={<EmployeeUpdate/>}/>
        <Route exact={true} path='/createEmployee' element={<EmployeeAddition/>}/>
        <Route exact={true} path='/registration' element={<Registration/>}/>
        <Route exact={true} path='/' element={<Login/>}/>
        <Route
          path="*"
          element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
          }
    />
        {/* <Route
        path="/redirect"
        element={<Navigate to="/" replace={true} />}
      /> */}
      </Routes>
    </div>
  );
}

export default App;
