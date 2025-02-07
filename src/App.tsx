import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import RequireAuth from "./components/require-auth";
import Home from "./routes/home";
import Login from "./routes/login";
import Invitados from "./routes/invitados";
import DashboardLayout from "./routes/dashboard-layout";
import Mensajes from "./routes/mensajes";
import Playlist from "./routes/playlist";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // NOTE: console log para efectos de prueba
  console.log("User:", !!currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Invitados />} />
        <Route path="mensajes" element={<Mensajes />} />
        <Route path="playlist" element={<Playlist />} />
      </Route>
    </Routes>
  );
}
export default App;
