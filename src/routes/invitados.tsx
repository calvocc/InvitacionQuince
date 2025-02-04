import { useContext, useEffect, useMemo } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

import { AuthContext } from "../context/auth-context";
import WLButtons from "../components/ui-theme/wl-button";

import Tabla from "../components/tabla-invitado";

import { useGetColection } from "../hooks/useGetColection";

export interface Invitados {
  number: number;
  invitado: string;
  celular: string;
  cupos: number;
  estado: string;
  uid: string;
}

function Invitados() {
  const { currentUser, signOut } = useContext(AuthContext);
  const { data, loading, error, getData } = useGetColection("Invitados");

  useEffect(() => {
    getData();
  }, []);

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

  return (
    <Container maxWidth="lg">
      <h3>Welcome! {currentUser?.email}</h3>
      <p>Sign In Status: {currentUser && "active"}</p>
      <WLButtons onClick={signOut} label="Sign Out" />
      {loadingData}
      {errorData}
      <Grid container spacing={2}>
        <Grid size={12}>
          <Tabla data={mapData} columns={columns} />
        </Grid>
      </Grid>
    </Container>
  );
}
export default Invitados;
