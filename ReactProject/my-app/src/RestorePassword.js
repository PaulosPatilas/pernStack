import {
  OutlinedInput,
  Input,
  Box,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

function RestorePassword() {
  const [email, setEmail] = useState([]);
  const [sent, setSent] = useState(false);
  const [sentMessage, setsentMessage] = useState("");

  function handleChange(e) {
    setEmail({...email,[e.target.id]:[e.target.value]});
  }

  async function handleClick() {
    if (email.email == "") {
      alert("Please give us your email first");
    } else {
      await fetch(`/api/restore`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      })
        .then((response) => response.json())
        .then((data) => {
          setSent(true);
          setsentMessage(data.message);
        });
    }
  }

  return (
    <div>
      <header>
        <h4>Did you forget your password?</h4>
      </header>
      <p>We will restore it for you. Just enter your email</p>
      <Box
        m="auto"
        sx={{
          width: 200,
          height: 120,
        }}
      >
        <FormControl>
          <InputLabel style={{ alignText: "left" }} htmlFor="email">
            Email
          </InputLabel>
          <OutlinedInput
            required
            id="email"
            value={email.email}
            onChange={handleChange}
            label="email"
          />
        </FormControl>
      </Box>
      <Button onClick={handleClick}>Sent</Button>
      {sent && <p>{sentMessage}</p>}
    </div>
  );
}

export default RestorePassword;
