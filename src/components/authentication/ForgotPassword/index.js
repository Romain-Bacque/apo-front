// hook import
import { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// component import
import { Button, Typography, Container } from "@mui/material";
import Input from "../../Input";
import AuthContainerThemeProvider from "../AuthContainerThemeProvider";
// action creator import
import { forgotPassword } from "../../../actions";

let isResetting = false;

// Component
function ForgetPassword() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputStatus, setInputStatus] = useState({
    email: { isValid: false, value: "" },
  });

  const isFormValid = inputStatus.email.isValid;

  const handleInputChange = useCallback((name, status) => {
    setInputStatus((prevState) => ({
      ...prevState,
      [name]: status,
    }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    const action = forgotPassword(inputStatus.email.value);

    dispatch(action);
    isResetting = true;
  };

  // if ureset email successfully sent
  useEffect(() => {
    if (loading.status === "success" && isResetting) {
      isResetting = false;
      navigate("/");
    }
  }, [loading]);

  return (
    <>
      {/* If user is connected, then we redirect to home page */}
      {isLogged && <Navigate to="/" />}
      <AuthContainerThemeProvider>
        <Container component="form" onSubmit={handleSubmit}>
          <Typography component="h2" variant="h3" color="gray">
            Réinitialisation Du Mot De Passe
          </Typography>
          <Input
            input={useMemo(
              () => ({
                id: "email",
                label: "Email",
                type: "email",
              }),
              []
            )}
            onInputChange={handleInputChange}
            name="email"
          />
          <Button type="submit" variant="contained">
            Envoyer un lien de réinitialisation
          </Button>
        </Container>
      </AuthContainerThemeProvider>
    </>
  );
}

export default ForgetPassword;
