import { FormControl } from "@mui/material";
import { Box, InputLabel, OutlinedInput, Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [passwords, setPassword] = useState({
    password: "",
    _password: "",
  });
  const params = useParams();

  function handleChange(e) {
    setPassword({ ...passwords, [e.target.id]: [e.target.value] });
  }

  //SKAEI H IF
  async function handleClick() {
    const code = params.confirmationCode;
    const pass = passwords.password;
    const _pass = passwords._password;
    console.log(passwords.password + " " + passwords._password);
    if (pass == "" || _pass == "") {
      alert("Complete the fields first");
    } else {
      if (pass == _pass) {
        alert("The passwords are diferent...");
      } else {
        await fetch(`/api/restore/${code}`, {
          method: "PUT",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify(passwords.password),
        });
      }
    }
  }

  return (
    <div>
      <Box
        m="auto"
        sx={{
          marginTop: 10,
          width: 200,
          height: 200,
        }}
      >
        <p>Enter your new password</p>
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
      </Box>
      <Button onClick={handleClick}>Reset</Button>
    </div>
  );
}

export default ResetPassword;
