import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import RequireAuth from "./components/require-auth";
import Home from "./routes/home";
import Login from "./routes/login";
import Profile from "./routes/profile";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // NOTE: console log para efectos de prueba
  console.log("User:", !!currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
