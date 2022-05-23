import { FormControl } from "@mui/material";
import { Box, InputLabel, OutlinedInput, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [passwords, setPassword] = useState([]);
  const [status, setStatus] = useState(true);
  const [message, setMessage] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.setItem("babino",params.confirmationCode);
  },[])

  function handleChange(e) {
    setPassword({ ...passwords, [e.target.id]: [e.target.value] });
  }

  async function handleClick(e) {
    e.preventDefault();
    const code = params.confirmationCode;
    const pass = passwords.password[0];
    const _pass = passwords._password[0];
    console.log(passwords);
    if (pass == "" || _pass == "") {
      alert("Complete the fields first");
    } else {
      if (pass != _pass) {
        alert("The passwords are diferent...");
      } else {
        await fetch(`/api/restore/${code}`, {
          method: "PUT",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify(passwords.password),
        })
          .then((response) => response.json())
          .then((data) => {
            setMessage(data.message);
            setStatus(data.status);
          });
        localStorage.removeItem("babino")
        navigate("/login");
      }
    }
  }

  return (
    <div>
      <form>
        <Box
          m="auto"
          sx={{
            marginTop: 10,
            width: 200,
            height: 200,
          }}
        >
          {status ? <p>Enter your new password</p> : { message }}
          <FormControl margin="dense">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              value={passwords.password}
              type="password"
              label="password"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="dense">
            <InputLabel htmlFor="_password">Confirm</InputLabel>
            <OutlinedInput
              margin="dense"
              id="_password"
              value={passwords._password}
              type="password"
              label="password"
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" onClick={handleClick}>
            Reset
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default ResetPassword;
