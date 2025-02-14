import { useContext, useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { v4 as uuidv4 } from "uuid";

import { AuthContext } from "../context/auth-context";
import WLButtons from "../components/ui-theme/wl-button";
import Tabla from "../components/tabla-invitado";
import DialogInvitado from "../components/dialog-invitado";

import {
  useGetColection,
  usePostColection,
  usePutColection,
  useDeleteColection,
} from "../hooks/useGetColection";

export interface Invitados {
  number?: number;
  invitado: string;
  celular: string;
  cupos: number;
  estado: string;
  uid?: string;
}

export interface InvitadosData {
  dirigida: string;
  invitado: string;
  celular: string;
  cupos: number;
  estado: number;
  uid?: string;
  invitadoPor?: string;
}

const initialInvitado: InvitadosData = {
  dirigida: "",
  invitado: "",
  celular: "",
  cupos: 0,
  estado: 0,
};

function Invitados() {
  const { currentUser } = useContext(AuthContext);
  const { data, loading, error, getData } = useGetColection("Invitados");
  const {
    loading: postLoading,
    showSnackbar: { open: showOpenSnackbar, message, severity },
    postData,
  } = usePostColection("Invitados");
  const {
    loading: putLoading,
    showSnackbar: {
      open: showOpenPutSnackbar,
      message: putMessage,
      severity: putSeverity,
    },
    putData,
  } = usePutColection("Invitados");
  const {
    showSnackbar: {
      open: showOpendeleteSnackbar,
      message: deleteMessage,
      severity: deleteSeverity,
    },
    deleteData,
  } = useDeleteColection("Invitados");

  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [invitado, setInvitado] = useState<InvitadosData>(initialInvitado);

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (showOpenSnackbar || showOpenPutSnackbar || showOpendeleteSnackbar) {
      setOpenSnackbar(true);
    }
  }, [showOpenSnackbar, showOpenPutSnackbar, showOpendeleteSnackbar]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (reason: string) => {
    if (reason === "backdropClick") return;
    setOpen(false);
  };

  const mapData = useMemo((): InvitadosData[] => {
    return data.map((item, index) => {
      return {
        number: index + 1,
        dirigida: item.dirigida as string,
        invitado: item.invitado as string,
        celular: item.celular as string,
        cupos: item.cupos as number,
        estado: item.estado as number,
        uid: item.uid as string,
      };
    });
  }, [data]);

  const columns: { id: string; label: string }[] = [
    { id: "number", label: "" },
    { id: "invitado", label: "Invitado" },
    { id: "celular", label: "Celular" },
    { id: "cupos", label: "Cupos" },
    { id: "estado", label: "Estado" },
    { id: "acciones", label: "Acciones" },
  ];

  const addInvitado = async (item: InvitadosData, type: string) => {
    const uuid = uuidv4();

    if (type === "post") {
      await postData({
        ...item,
        uid: uuid,
        estado: 0,
        invitadoPor: currentUser?.email ?? "No definido",
      });
    }
    if (type === "put") {
      await putData({ ...item });
    }
    handleClose("submit");
    setInvitado(initialInvitado);
    getData();
  };

  const onEdit = (invitado: InvitadosData) => {
    setInvitado(invitado);
    handleClickOpen();
  };

  const onDelete = async (uid: string) => {
    await deleteData(uid);
    getData();
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "80px" }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity={severity || putSeverity || deleteSeverity}>
            {message || putMessage || deleteMessage}
          </Alert>
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
        <Grid container spacing={2}>
          <Grid size={12}>
            <Tabla
              data={mapData}
              columns={columns}
              onEdit={onEdit}
              onDelete={onDelete}
              loadingData={loading}
              errorData={error?.message}
            />
          </Grid>
        </Grid>
      </Container>

      <DialogInvitado
        open={open}
        handleClose={(option) => handleClose(option)}
        onAction={(item, type) => addInvitado(item, type)}
        postLoading={postLoading || putLoading}
        invitado={invitado}
        setInvitado={setInvitado}
      />
    </>
  );
}
export default Invitados;
