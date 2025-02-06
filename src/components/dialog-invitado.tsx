import {
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

import WLButtons from "../components/ui-theme/wl-button";

import { InvitadosData } from "../routes/invitados";

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

interface DialogInvitadoProps {
  open: boolean;
  handleClose: (reason: string) => void;
  onAction: (invitado: InvitadosData, type: string) => void;
  postLoading: boolean;
  invitado: InvitadosData;
  setInvitado: React.Dispatch<React.SetStateAction<InvitadosData>>;
}

const DialogInvitado = ({
  open,
  handleClose,
  onAction,
  postLoading,
  invitado,
  setInvitado,
}: DialogInvitadoProps) => {
  return (
    <Dialog open={open} onClose={() => handleClose("backdropClick")}>
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
            value={invitado.dirigida}
            onChange={(event) => {
              setInvitado((prev) => ({
                ...prev,
                dirigida: event.target.value,
              }));
            }}
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
          value={invitado.invitado}
          onChange={(event) => {
            setInvitado((prev) => ({
              ...prev,
              invitado: event.target.value,
            }));
          }}
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
          value={invitado.celular}
          onChange={(event) => {
            setInvitado((prev) => ({
              ...prev,
              celular: event.target.value,
            }));
          }}
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
          value={invitado.cupos}
          onChange={(event) => {
            setInvitado((prev) => ({
              ...prev,
              cupos: parseInt(event.target.value),
            }));
          }}
        />
      </DialogContent>
      <DialogActions>
        <WLButtons
          onClick={() => handleClose("cancel")}
          label="Cancel"
          disabled={postLoading}
        />
        <WLButtons
          label={invitado.uid ? "editar" : "Agregar"}
          disabled={postLoading}
          onClick={() => onAction(invitado, invitado.uid ? "put" : "post")}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogInvitado;
