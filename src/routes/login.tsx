import { ChangeEvent, FormEvent, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

import WLTexts from "../components/ui-theme/wl-texts";
import WLButtons from "../components/ui-theme/wl-button";
import { signInUser } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const StyledContainerApp = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
});

function Login() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Envía el correo electrónico y la contraseña a firebase.
      const userCredential = await signInUser(email, password);

      if (userCredential) {
        resetFormFields();
        navigate("/profile");
      }
    } catch (error) {
      console.log("error", error);
      setErrorMessage((error as Error).message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setErrorMessage("");
  };

  return (
    <StyledContainerApp>
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={"error"}>{errorMessage}</Alert>
      </Snackbar>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2 }}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Grid size={{ xs: 12, sm: 7, md: 6, lg: 5 }} alignContent={"center"}>
            <WLTexts variant="h4" weight={700}>
              Invitacion W&L
            </WLTexts>
            <WLTexts variant="body1">
              Ingresa tu correo electrónico y contraseña para administrar tus
              quince.
            </WLTexts>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Grid size={{ xs: 12, sm: 7, md: 6, lg: 5 }} alignContent={"center"}>
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="text"
                fullWidth
                variant="standard"
                value={email}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                fullWidth
                variant="standard"
                value={password}
                onChange={handleChange}
              />
              <WLButtons
                label={"Ingresar"}
                type="submit"
                sx={{ marginTop: 4 }}
                fullWidth
              />
            </form>
          </Grid>
        </Grid>
      </Container>
    </StyledContainerApp>
  );
}

export default Login;
