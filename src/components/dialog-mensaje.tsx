import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

import WLButtons from "../components/ui-theme/wl-button";

export interface MensajeData {
  mensaje: string;
}

interface DialogMensajeProps {
  open: boolean;
  handleClose: (reason: string) => void;
  onAction: (mensaje: MensajeData) => void;
  postLoading: boolean;
  mensaje: MensajeData;
  setMensaje: React.Dispatch<React.SetStateAction<MensajeData>>;
}

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

const DialogMensaje = ({
  open,
  handleClose,
  onAction,
  postLoading,
  mensaje,
  setMensaje,
}: DialogMensajeProps) => {
  return (
    <Dialog open={open} onClose={() => handleClose("backdropClick")}>
      {postLoading && (
        <Box sx={{ width: "100%" }}>
          <StyleLinearProgress />
        </Box>
      )}
      <StyleDialogTitle>Escribir deseo</StyleDialogTitle>
      <DialogContent>
        <StyleDialogContentText>
          Dejanos un mensaje contandonos tus buenos deseos.
        </StyleDialogContentText>

        <TextField
          autoFocus
          required
          margin="dense"
          id="mensaje"
          name="mensaje"
          label="Mensaje"
          type="text"
          fullWidth
          multiline
          variant="standard"
          value={mensaje.mensaje}
          onChange={(event) => {
            setMensaje((prev) => ({
              ...prev,
              mensaje: event.target.value,
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
          label={"Enviar"}
          disabled={postLoading}
          onClick={() => onAction(mensaje)}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogMensaje;
