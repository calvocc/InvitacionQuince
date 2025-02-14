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

export interface PlayListData {
  cancion: string;
  artista: string;
}

interface DialogPlaylistProps {
  open: boolean;
  handleClose: (reason: string) => void;
  onAction: (invitado: PlayListData) => void;
  postLoading: boolean;
  playList: PlayListData;
  setPlayList: React.Dispatch<React.SetStateAction<PlayListData>>;
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

const DialogPlaylist = ({
  open,
  handleClose,
  onAction,
  postLoading,
  playList,
  setPlayList,
}: DialogPlaylistProps) => {
  return (
    <Dialog open={open} onClose={() => handleClose("backdropClick")}>
      {postLoading && (
        <Box sx={{ width: "100%" }}>
          <StyleLinearProgress />
        </Box>
      )}
      <StyleDialogTitle>Recomendar canción</StyleDialogTitle>
      <DialogContent>
        <StyleDialogContentText>
          Cuentanos que cancion quieres que haga parte del PlayList de la boda.
        </StyleDialogContentText>

        <TextField
          autoFocus
          required
          margin="dense"
          id="cancion"
          name="cancion"
          label="Cancion"
          type="text"
          fullWidth
          variant="standard"
          value={playList.cancion}
          onChange={(event) => {
            setPlayList((prev) => ({
              ...prev,
              cancion: event.target.value,
            }));
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="artista"
          name="artista"
          label="Artista"
          type="text"
          fullWidth
          variant="standard"
          value={playList.artista}
          onChange={(event) => {
            setPlayList((prev) => ({
              ...prev,
              artista: event.target.value,
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
          label={"Agregar"}
          disabled={postLoading}
          onClick={() => onAction(playList)}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogPlaylist;
