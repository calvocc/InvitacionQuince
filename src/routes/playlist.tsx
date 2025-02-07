import { useEffect, useMemo } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

import WLTexts from "../components/ui-theme/wl-texts";
import Tabla from "../components/tabla-invitado";

import { useGetColection } from "../hooks/useGetColection";

export interface PlaylistData {
  invitado: string;
  cancion: string;
  artista: string;
  uid?: string;
}

function Mensajes() {
  const { data, loading, error, getData } = useGetColection("Playlist");

  useEffect(() => {
    getData();
  }, []);

  const mapData = useMemo((): PlaylistData[] => {
    return data.map((item, index) => {
      return {
        number: index + 1,
        invitado: item.invitado as string,
        cancion: item.cancion as string,
        artista: item.artista as string,
        uid: item.uid as string,
      };
    });
  }, [data]);

  const columns: { id: string; label: string }[] = [
    { id: "number", label: "" },
    { id: "invitado", label: "Invitado" },
    { id: "cancion", label: "Cancion" },
    { id: "artista", label: "Artista" },
  ];

  return (
    <>
      <Container maxWidth="lg">
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
            <WLTexts variant="h3">Playlist</WLTexts>
            <WLTexts variant="body1">
              Listado de canciones recomendadas.
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
