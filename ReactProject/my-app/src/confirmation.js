import { Container } from "@mui/material";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Confirmation(props) {
  const params = useParams();
  const confirmationCode = params.confirmationCode;

  useEffect(() => {
    localStorage.setItem("vasilakos",params.confirmationCode);
    fetch(`/api/confirmation/${confirmationCode}`).then((response) => {
      response.json();
    });
    //localStorage.removeItem("vasilakos")
  }, []);
  return (
    <Container>
      <header>
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
      <Link onClick={()=>{localStorage.removeItem("vasilakos")}} to={"/login"}>Please Login</Link>
    </Container>
  );
}

export default Confirmation;
