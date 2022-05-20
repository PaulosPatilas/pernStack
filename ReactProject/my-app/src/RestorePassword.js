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

   const handleSubmit = async (e) => {
     e.preventDefault()
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
    <div style={{textAlign:'center'}}>
      <header>
        <h4>Did you forget your password?</h4>
      </header>
      <p>We will restore it for you. Just enter your email</p>
      <form onSubmit={handleSubmit}>
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
      <Button type="submit" onClick={handleSubmit}>Sent</Button>
      {sent && <p>{sentMessage}</p>}
      </form>
    </div>
  );
}

export default RestorePassword;
