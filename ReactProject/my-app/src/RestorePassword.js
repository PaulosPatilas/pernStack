import { OutlinedInput } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useState } from "react";
import { Box, Button } from "@mui/material";

function RestorePassword() {
  const [email, setEmail] = useState({ email: "" });
  const [sent, setSent] = useState(false);
  const [sentMessage, setsentMessage] = useState("");

  function handleChange(e) {
    setEmail(([e.target.id] = [e.target.value]));
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
      }).then((response) => {
        setSent(true);
        setsentMessage(response.json());
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
        <InputLabel style={{ alignText: "left" }} htmlFor="email">
          Email
        </InputLabel>
        <OutlinedInput
          id="email"
          value={email.email}
          onChange={handleChange}
          label="email"
        />
      </Box>
      <Button onClick={handleClick}>Sent</Button>
      {/* {sent && <p>{sentMessage}</p>} */}
    </div>
  );
}

export default RestorePassword;
