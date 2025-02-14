import { useEffect, useMemo } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

import WLTexts from "../components/ui-theme/wl-texts";
import Tabla from "../components/tabla-invitado";

import { useGetColection } from "../hooks/useGetColection";

export interface Invitados {
  number?: number;
  invitado: string;
  celular: string;
  cupos: number;
  estado: string;
  uid?: string;
}

export interface MensajesData {
  invitado: string;
  mensaje: string;
  uid?: string;
}

function Mensajes() {
  const { data, loading, error, getData } = useGetColection("Mensajes");

  useEffect(() => {
    getData();
  }, []);

  const mapData = useMemo((): MensajesData[] => {
    return data.map((item, index) => {
      return {
        number: index + 1,
        invitado: item.invitado as string,
        mensaje: item.mensaje as string,
        uid: item.uid as string,
      };
    });
  }, [data]);

  const columns: { id: string; label: string }[] = [
    { id: "number", label: "" },
    { id: "invitado", label: "Invitado" },
    { id: "mensaje", label: "Mensaje" },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "80px" }}>
        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2, marginTop: 4 }}
          alignContent={"center"}
        >
          <Grid
            size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            alignContent={"center"}
          >
            <WLTexts variant="h3">Mensajes</WLTexts>
            <WLTexts variant="body1">
              Estos son los deseos de sus invitados para ustedes.
            </WLTexts>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Tabla
              data={mapData}
              columns={columns}
              onEdit={() => {}}
              onDelete={() => {}}
              loadingData={loading}
              errorData={error?.message}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Mensajes;
