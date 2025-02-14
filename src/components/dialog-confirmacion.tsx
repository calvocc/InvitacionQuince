import { Dialog, DialogContent, DialogActions, Box } from "@mui/material";
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
  onAction: (c: number) => void;
  postLoading: boolean;
  invitado: InvitadosData;
}

const DialogConfirmacion = ({
  open,
  handleClose,
  onAction,
  postLoading,
  invitado,
}: DialogInvitadoProps) => {
  return (
    <Dialog open={open} onClose={() => handleClose("backdropClick")}>
      {postLoading && (
        <Box sx={{ width: "100%" }}>
          <StyleLinearProgress />
        </Box>
      )}
      <StyleDialogTitle>Confirmar asistencia</StyleDialogTitle>
      <DialogContent>
        <StyleDialogContentText>
          Estas a un click de participar del inicio de esta nueva etapa en
          nuestras vidas, por lo que te pedimos nos ayudes a mantener todo
          organizado y ordenado respetando el numero de cupos que se te
          asignaron {invitado.cupos} cupos.
          <br />
          <br />
          GRACIAS...
        </StyleDialogContentText>
      </DialogContent>
      <DialogActions>
        <WLButtons
          onClick={() => handleClose("cancel")}
          label="Cancel"
          disabled={postLoading}
        />
        <WLButtons
          label={"No asistiré"}
          disabled={postLoading}
          onClick={() => onAction(-1)}
          colorLight={true}
        />
        <WLButtons
          label={"Asistiré"}
          disabled={postLoading}
          onClick={() => onAction(1)}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmacion;
