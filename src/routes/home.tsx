import { useNavigate } from "react-router-dom";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";

import WLButtons from "../components/ui-theme/wl-button";
import WLTexts from "../components/ui-theme/wl-texts";

const ContainerIconBtn = styled("div")`
  position: relative;
  width: 17px;
  height: 17px;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 8px;
    margin-top: 0px;
    margin-left: -4px;
    line-height: 6px;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 17px;
  }
`;

function Home() {
  const navigate = useNavigate();

  const signOut = async () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid size={6}>
          <WLButtons
            onClick={signOut}
            label="Agendar fecha"
            icon={
              <ContainerIconBtn>
                <span>12</span>
                <CalendarTodayOutlinedIcon />
              </ContainerIconBtn>
            }
          />
        </Grid>
        <Grid size={6}>
          <WLButtons
            onClick={signOut}
            label="Agendar fecha"
            colorLight={true}
            icon={
              <ContainerIconBtn>
                <span>12</span>
                <CalendarTodayOutlinedIcon />
              </ContainerIconBtn>
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={12}>
          <WLTexts variant="h2" weight={800} color="#686754">
            HOLA MUNDO
          </WLTexts>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
