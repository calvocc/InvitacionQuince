import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import WLButtons from "../components/ui-theme/wl-button";

import { useGetColection } from "../hooks/useGetColection";

function Profile() {
  const { currentUser, signOut } = useContext(AuthContext);
  const { data, loading, error, getData } = useGetColection("Invitados");

  useEffect(() => {
    getData();
  }, []);

  const loadingData = loading && <p>Loading data...</p>;
  const errorData = error && <p>{error.message}</p>;

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

  return (
    /**
     * Extrae el usuario del Context, si quieres
     * Obtener la información del usuario,
     * como el correo electrónico, su nombre, etc.
     */
    <div>
      <h3>Welcome! {currentUser?.email}</h3>
      <p>Sign In Status: {currentUser && "active"}</p>

      <WLButtons onClick={signOut} label="Sign Out" />

      {loadingData}
      {errorData}
      {data?.map((item) => {
        console.log("item", item);
        return (
          <div key={item.id}>
            <p>Invitado: {item.invitado}</p>
            <p>Celular: {item.celular}</p>
            <p>Cupos: {item.cupos}</p>
            <p>Dirigida: {item.dirigida}</p>
            <p>Estado: {mapEstado(item.estado as number)}</p>
            <button>Editar</button>
            <button>Eliminar</button>
          </div>
        );
      })}
    </div>
  );
}
export default Profile;
