import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";

import { auth, signInAnonymously } from "../firebase/firebase";

import WLButtons from "../components/ui-theme/wl-button";
import WLTexts from "../components/ui-theme/wl-texts";

import { useGetColectionId } from "../hooks/useGetColection";
import { AuthContext } from "../context/auth-context";

import bannerX1 from "../assets/img/banner.png";
import bannerX2 from "../assets/img/banner@2x.png";
import bannerX3 from "../assets/img/banner@3x.png";
import anillos from "../assets/img/anillos.png";
import bendicion from "../assets/img/IconBendicion.png";

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

const StyleContainerSaveDate = styled("div")`
  position: relative;
`;

const StyleContainerSaveDateText = styled("div")`
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
`;

const StyleLogo = styled("h1")`
  position: absolute;
  font-family: "millanovaregular";
  font-size: 50px;
  line-height: 95px;
  top: -350px;
  left: -30px;
  transform: rotate(-90deg);
  transform-origin: center;
  z-index: 2;
  width: 500px;
  height: 95px;
  margin: 0px;
  color: #242522;
`;

const StyleTextSaveDate = styled("div")`
  text-align: center;
`;
const StyleTextFecha = styled("h3")`
  font-size: 3rem;
  font-weight: 800;
  margin-top: 0px;
  margin-bottom: 0px;
  line-height: 2.6rem;
  color: #686754;
`;
const StyleTextSubFecha = styled("p")`
  font-size: 1rem;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #9aa098;
`;

const StyleContainerBendicion = styled("div")`
  width: 100%;
`;

const StyleImgAnillo = styled("img")`
  width: 100px;
  height: auto;
`;

const StyleTextVersiculo = styled("p")`
  color: #686754;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
`;

const StyleImgBendicion = styled("img")`
  width: 100px;
  height: auto;
  margin-top: 20px;
`;

const StyleTextPadres = styled("p")`
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  color: #686754;
`;
const StyleTextNosotros = styled("span")`
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  color: #686754;
  position: relative;
  ::before {
    content: "";
    position: absolute;
    width: 40px;
    height: 1px;
    background-color: #9aa098;
    top: 50%;
    left: -60px;
  }
  ::after {
    content: "";
    position: absolute;
    width: 40px;
    height: 1px;
    background-color: #9aa098;
    top: 50%;
    right: -60px;
  }
`;

const StyleLogoAmpersand = styled("div")`
  position: relative;
  margin-top: 20px;
  h2 {
    font-family: "millanovaregular";
    font-size: 2rem;
    line-height: 50px;
    color: #686754;
    text-align: center;
    position: relative;
    z-index: 2;
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    font-weight: 800;
    font-size: 120px;
    line-height: 120px;
    color: #9aa098;
    margin-top: -55px;
    margin-left: -47px;
    opacity: 0.3;
  }
`;

function Home() {
  const { signOut } = useContext(AuthContext);
  const { uid } = useParams();
  const {
    data,
    loading = true,
    error,
    getDataId,
  } = useGetColectionId("Invitados");

  useEffect(() => {
    signInAnonymously(auth)
      .then((user) => {
        if (user.user.isAnonymous && uid) {
          getDataId(uid);
        }
      })
      .catch(() => {
        //! redireccionar a pantalla de error
      });
  }, [uid]);

  console.log("loading", loading);
  console.log("data", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <StyleContainerSaveDate>
        <img
          src={bannerX1}
          srcSet={`
            ${bannerX1} 480w,
            ${bannerX2} 768w,
            ${bannerX3} 1200w
          `}
          sizes="(max-width: 480px) 480px,
             (max-width: 768px) 768px,
             1200px"
          alt="Save the date"
          loading="lazy"
          style={{ width: "100%", height: "auto" }}
        />

        <StyleContainerSaveDateText>
          <StyleLogo>Wilson y Luisa</StyleLogo>
          <StyleTextSaveDate>
            <StyleTextSubFecha>SAVE THE DATE</StyleTextSubFecha>
            <StyleTextFecha>12.04.25</StyleTextFecha>
            <StyleTextSubFecha>NUESTRA BODA</StyleTextSubFecha>
          </StyleTextSaveDate>
        </StyleContainerSaveDateText>
      </StyleContainerSaveDate>

      <StyleContainerBendicion>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 10, sm: 10, md: 10, lg: 10 }}
              offset={{ xs: 1, sm: 1, md: 1, lg: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <StyleImgAnillo src={anillos} alt="anillos" />
              <StyleTextVersiculo>
                'Nosotros sabemos cuánto nos ama Dios y hemos puesto nuestra
                confianza en su amor. Dios es amor, y todos los que viven en
                amor viven en Dios y Dios vive en ellos'
                <br />
                <b>1 Juan 4:16</b>{" "}
              </StyleTextVersiculo>
              <StyleImgBendicion src={bendicion} alt="bendicion" />
              <StyleTextPadres>
                con la bendición de dios y nuestros padres
              </StyleTextPadres>
              <StyleTextNosotros>NOSOTROS</StyleTextNosotros>
              <StyleLogoAmpersand>
                <h2>Wilson y Luisa</h2>
                <span>&</span>
              </StyleLogoAmpersand>
            </Grid>
          </Grid>
        </Container>
      </StyleContainerBendicion>

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
            <WLTexts variant="h5" weight={800} color="#686754">
              HOLA {data?.dirigida}, {data?.invitado}
            </WLTexts>
            <WLTexts variant="body1" weight={400} color="#686754">
              Ustedes tienen derecho a {data?.cupos} cupos.
            </WLTexts>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
