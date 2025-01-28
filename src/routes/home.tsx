import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

import WLButtons from "../components/ui-theme/wl-button";

function Home() {
  const navigate = useNavigate();

  const signOut = async () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid size={8}>
          <WLButtons onClick={signOut} label="Sign out" icon={<DeleteIcon />} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
