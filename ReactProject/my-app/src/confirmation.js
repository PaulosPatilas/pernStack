import { Container } from "@mui/material";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Confirmation(props) {
  const params = useParams();
  const confirmationCode = params.confirmationCode;
  useEffect(() => {
    fetch(`/api/confirmation/${confirmationCode}`).then((response) => {
      response.json();
    });
  }, []);
  return (
    <Container>
      <header>
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
      <Link to={"/login"}>Please Login</Link>
    </Container>
  );
}

export default Confirmation;
