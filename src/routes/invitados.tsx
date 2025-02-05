import { useContext, useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { v4 as uuidv4 } from "uuid";

import { AuthContext } from "../context/auth-context";
import WLButtons from "../components/ui-theme/wl-button";
import Tabla from "../components/tabla-invitado";

import { useGetColection, usePostColection } from "../hooks/useGetColection";

const StyleDialogTitle = styled(DialogTitle)`
  font-family: "Poppins", serif;
  font-weight: 700;
  font-size: 1.2rem;
  padding-bottom: 5px;
`;

const StyleDialogContentText = styled(DialogContentText)`
  font-family: "Poppins", serif;
  font-weight: 400;
  font-size: 0.8rem;
`;

const StyleLinearProgress = styled(LinearProgress)`
  width: 100%;
  .MuiLinearProgress-bar {
    background-color: #9aa098;
  }
  && {
    background-color: #686754;
  }
`;

export interface Invitados {
  number: number;
  invitado: string;
  celular: string;
  cupos: number;
  estado: string;
  uid: string;
}

export interface InvitadosData {
  dirigida: string;
  invitado: string;
  celular: string;
  cupos: number;
  estado: number;
  uid: string;
  invitadoPor: string;
}

function Invitados() {
  const { currentUser } = useContext(AuthContext);
  const { data, loading, error, getData } = useGetColection("Invitados");
  const {
    loading: postLoading,
    showSnackbar: { open: showOpenSnackbar, message, severity },
    postData,
  } = usePostColection("Invitados");
  const [open, setOpen] = useState(false);
  const [invitado, setInvitado] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setInvitado(event.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (showOpenSnackbar) {
      setOpenSnackbar(true);
    }
  }, [showOpenSnackbar]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (reason: string) => {
    if (reason === "backdropClick") return;
    setOpen(false);
  };

  const mapEstado = (estado: number) => {
    switch (estado) {
      case 0:
        return "Pendiente";
      case 1:
        return "Confirmado";
      case 2:
        return "Cancelado";
      default:
        return "No definido";
    }
  };

  const mapData = useMemo((): Invitados[] => {
    return data.map((item, index) => {
      return {
        number: index + 1,
        invitado: `${item.dirigida}. ${item.invitado} `,
        celular: item.celular as string,
        cupos: item.cupos as number,
        estado: mapEstado(item.estado as number),
        uid: item.uid as string,
      };
    });
  }, [data]);

  const loadingData = loading && <p>Loading data...</p>;
  const errorData = error && <p>{error.message}</p>;

  const columns: { id: string; label: string }[] = [
    { id: "number", label: "" },
    { id: "invitado", label: "Invitado" },
    { id: "celular", label: "Celular" },
    { id: "cupos", label: "Cupos" },
    { id: "estado", label: "Estado" },
    { id: "acciones", label: "Acciones" },
  ];

  const addInvitado = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const uuid = uuidv4();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    postData({
      ...formJson,
      cupos: parseInt(formJson.cupos),
      uid: uuid,
      estado: 0,
      invitadoPor: currentUser?.email ?? "No definido",
    });
    handleClose("submit");
  };

  return (
    <>
      <Container maxWidth="lg">
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity={severity}>{message}</Alert>
        </Snackbar>
        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2, marginTop: 4 }}
          alignContent={"center"}
        >
          <Grid size={{ xs: 12, sm: 7, md: 8, lg: 9 }} alignContent={"center"}>
            <h3>Hola: {currentUser?.email}</h3>
          </Grid>
          <Grid size={{ xs: 12, sm: 5, md: 4, lg: 3 }} alignContent={"center"}>
            <WLButtons
              onClick={handleClickOpen}
              label="Agregar invitado"
              fullWidth
            />
          </Grid>
        </Grid>
        {loadingData}
        {errorData}
        <Grid container spacing={2}>
          <Grid size={12}>
            <Tabla data={mapData} columns={columns} />
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={open}
        onClose={() => handleClose("backdropClick")}
        PaperProps={{
          component: "form",
          onSubmit: addInvitado,
        }}
      >
        {postLoading && (
          <Box sx={{ width: "100%" }}>
            <StyleLinearProgress />
          </Box>
        )}
        <StyleDialogTitle>Agregar invitados</StyleDialogTitle>
        <DialogContent>
          <StyleDialogContentText>
            Completa los datos para agregar un nuevo invitado.
          </StyleDialogContentText>
          <FormControl variant="standard" fullWidth sx={{ marginTop: 4 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Dirigida a:
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-standard-label"
              id="dirigida"
              name="dirigida"
              value={invitado}
              onChange={handleChange}
              label="Dirigida a"
            >
              <MenuItem value="" disabled>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Sr"}>Señor</MenuItem>
              <MenuItem value={"Sra"}>Señora</MenuItem>
              <MenuItem value={"Sr. y Sra"}>Señor y Señora</MenuItem>
              <MenuItem value={"Srta"}>Señorita</MenuItem>
              <MenuItem value={"Dr"}>Doctor</MenuItem>
              <MenuItem value={"Dra"}>Doctora</MenuItem>
              <MenuItem value={"Ing"}>Ingeniero</MenuItem>
              <MenuItem value={"Lic"}>Licenciado</MenuItem>
              <MenuItem value={"Apreciado"}>Apreciado</MenuItem>
              <MenuItem value={"Apreciada"}>Apreciada</MenuItem>
              <MenuItem value={"Familia"}>Familia</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            required
            margin="dense"
            id="invidato"
            name="invitado"
            label="Invitado"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="celular"
            name="celular"
            label="Celular"
            type="phone"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="cupos"
            name="cupos"
            label="Cupos"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <WLButtons
            onClick={() => handleClose("backdropClick")}
            label="Cancel"
            disabled={postLoading}
          ></WLButtons>
          <WLButtons
            type="submit"
            label="Agregar"
            disabled={postLoading}
          ></WLButtons>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default Invitados;
