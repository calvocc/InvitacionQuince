import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Parallax } from "react-scroll-parallax";
import { v4 as uuidv4 } from "uuid";

import { auth, signInAnonymously } from "../firebase/firebase";

import WLButtons from "../components/ui-theme/wl-button";
import Items from "../components/items";
import Cronometro from "../components/cronometro";
import DialogPlaylist, { PlayListData } from "../components/dialog-playlist";
import DialogConfirmacion from "../components/dialog-confirmacion";
import DialogMensaje, { MensajeData } from "../components/dialog-mensaje";
import { InvitadosData } from "../routes/invitados";

import {
  useGetColectionId,
  usePostColection,
  usePutColection,
} from "../hooks/useGetColection";

import bannerX1 from "../assets/img/banner.png";
import bannerX2 from "../assets/img/banner@2x.png";
import bannerX3 from "../assets/img/banner@3x.png";
import anillos from "../assets/img/anillos.png";
import bendicion from "../assets/img/IconBendicion.png";
import honorX1 from "../assets/img/honor.png";
import honorX2 from "../assets/img/honor@2x.png";
import honorX3 from "../assets/img/honor@3x.png";
import copas from "../assets/img/copas.png";
import castilloX1 from "../assets/img/castillo.png";
import castilloX2 from "../assets/img/castillo@2x.png";
import castilloX3 from "../assets/img/castillo@3x.png";
import lugar from "../assets/img/lugar.png";
import hojas from "../assets/img/hojas.png";
import zapatos from "../assets/img/zapatos.png";
import musica from "../assets/img/musica.png";
import regalo from "../assets/img/regalos.png";
import photos1X1 from "../assets/img/playa1.png";
import photos1X2 from "../assets/img/playa1@2x.png";
import photos1X3 from "../assets/img/playa1@3x.png";
import photos2X1 from "../assets/img/playa2.png";
import photos2X2 from "../assets/img/playa2@2x.png";
import photos2X3 from "../assets/img/playa2@3x.png";
import despedidaX1 from "../assets/img/despedida.png";
import despedidaX2 from "../assets/img/despedida@2x.png";
import despedidaX3 from "../assets/img/despedida@3x.png";
import mensajeicon from "../assets/img/mensaje.png";

const formatDateForGoogleCalendar = (dateString: string) => {
  return (
    new Date(dateString).toISOString().replace(/[-:.]/g, "").slice(0, -4) + "Z"
  );
};

const event = {
  title: "Boda de Wilson y Luisa",
  startDate: formatDateForGoogleCalendar("2025-04-12T16:00:00Z"),
  endDate: formatDateForGoogleCalendar("2025-04-12T23:59:00Z"),
  details:
    "Nos encantaría que nos acompañaras en nuestra boda. guarda la fecha y celebra con nosotros.",
  location: "Centro de eventos la alameda, Funza Cundinamarca",
};

const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE
&text=${encodeURIComponent(event.title)}
&dates=${event.startDate}/${event.endDate}
&details=${encodeURIComponent(event.details)}
&location=${encodeURIComponent(event.location)}
&sf=true&output=xml`;

// const Color1 = "#8C00FE";
// const Color2 = "#A251FB";
// const Color3 = "#a16dff";
// const Color4 = "#d398f9";

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
  bottom: 20px;
  left: 0;
  width: 100%;
`;
const StyleContainerLogogo = styled("div")`
  position: relative;
  text-align: center;
  width: 100%;
  margin-bottom: 80px;
`;
const StyleLogoTitulo = styled("h1")`
  font-family: "Mr Bedfort", cursive;
  font-size: 4.5rem;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #a251fb;
  width: 100%;
  height: 70px;
`;
const StyleLogoSunTitulo = styled("h2")`
  font-size: 1rem;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #a16dff;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  text-align: center;
`;

const StyleContainerLogoPq = styled("div")`
  position: relative;
  text-align: center;
  width: 100%;
`;
const StyleLogoTituloPq = styled("h1")`
  font-family: "Mr Bedfort", cursive;
  font-size: 2.5rem;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #a251fb;
  width: 100%;
  height: 40px;
`;
const StyleLogoSunTituloPq = styled("h2")`
  font-size: 0.6rem;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #a16dff;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  text-align: center;
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
  color: #a251fb;
`;
const StyleTextSubFecha = styled("p")`
  font-size: 1rem;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #a16dff;
`;

const StyleContainerBendicion = styled("div")`
  width: 100%;
`;

export const StyleImgAnillo = styled("img")`
  width: 100px;
  height: auto;
`;

export const StyleTextRegular = styled("p")`
  color: #a16dff;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
`;

export const StyleTextRegularBold = styled("p")`
  color: #a251fb;
  font-size: 1rem;
  font-weight: 800;
  text-align: center;
`;

export const StyleTextRegularSemiBold = styled("p")`
  color: #a251fb;
  font-size: 1rem;
  font-weight: 600;
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
  color: #a251fb;
`;
const StyleTextNosotros = styled("span")`
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  color: #a251fb;
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
  margin-top: 0px;
  h2 {
    font-family: "Mr Bedfort", cursive;
    font-size: 3rem;
    line-height: 50px;
    color: #a251fb;
    text-align: center;
    position: relative;
    z-index: 2;
    margin-top: 0px;
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

const StyleContainerInvitacion = styled("div")`
  position: relative;
  img {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    margin-bottom: 20px;
  }
`;

const StyleContainerTextInvitarlos = styled("div")`
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  z-index: 2;
`;

export const StyleTextCursiva = styled("p")`
  font-family: "Mr Bedfort", cursive;
  font-size: 3rem;
  line-height: 50px;
  color: #a251fb;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const StyleContainerInvitados = styled("div")`
  width: 100%;
  position: relative;
`;

const StyleContainerLugar = styled("div")`
  width: 100%;
  position: relative;
  margin-top: 50px;
  .imgcastillo {
    height: auto;
    position: relative;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    margin-bottom: 50px;
  }
`;

const StyleFondoLugar = styled("div")`
  position: absolute;
  bottom: 0px;
  left: 0;
  background-color: #a251fb;
  width: 100%;
  height: 50%;
  z-index: 1;
`;

const StyleContainerRecepcion = styled("div")`
  background-color: #a251fb;
  width: 100%;
  position: relative;
  z-index: 3;
  text-align: center;
  padding-bottom: 50px;
  margin-top: -5px;
`;

const StyleContainerVarios = styled("div")`
  width: 100%;
  position: relative;
  padding-top: 120px;
`;

const StyleContainerParalax = styled("div")`
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: hidden;
  height: 120px;
`;

const StyleBacgroundParalax = styled("div")`
  width: 100%;
  height: 120px;
  background-image: url(${hojas});
  background-position: top left;
  background-size: auto 120px;
  background-repeat: repeat-x;
`;

const StyleContainerPhotos = styled("div")`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
`;

const StyleContainerTextPhotos = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140px;
  height: 150px;
  margin-left: -70px;
  margin-top: -75px;
  z-index: 2;
  text-align: center;
  background-color: #fff;
`;

const StyleTextHastag = styled("div")`
  text-align: center;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
`;

const StyleContainerDespedida = styled("div")`
  width: 100%;
  position: relative;
`;

const StyleContainerLoading = styled("div")`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

function Home() {
  const { uid } = useParams();
  const {
    data,
    loading = true,
    error,
    getDataId,
  } = useGetColectionId("Invitados");

  const {
    loading: putLoading,
    showSnackbar: {
      open: showOpenPutSnackbar,
      message: putMessage,
      severity: putSeverity,
    },
    putData,
  } = usePutColection("Invitados");

  const [open, setOpen] = useState(false);
  const [openMensaje, setOpenMensaje] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [playList, setPlayList] = useState<PlayListData>({
    cancion: "",
    artista: "",
  });
  const [mensaje, setMensaje] = useState<MensajeData>({
    mensaje: "",
  });

  const {
    loading: postLoading,
    showSnackbar: { open: showOpenSnackbar, message, severity },
    postData,
  } = usePostColection("Playlist");

  const {
    loading: mensajeLoading,
    showSnackbar: {
      open: showOpenMensajeSnackbar,
      message: messageMensaje,
      severity: severityMensaje,
    },
    postData: postMensaje,
  } = usePostColection("Mensajes");

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const onClosePlayList = (type: string) => {
    if (type === "backdropClick") return;
    setOpen(false);
  };

  const onCloseMensaje = (type: string) => {
    if (type === "backdropClick") return;
    setOpenMensaje(false);
  };

  const onCloseConfirm = (type: string) => {
    if (type === "backdropClick") return;
    setOpenConfirm(false);
  };

  const addCancion = async (item: PlayListData) => {
    const uuid = uuidv4();

    await postData({
      ...item,
      uid: uuid,
      invitado: data?.invitado ?? "",
      fecha: new Date().toISOString(),
    });

    onClosePlayList("submit");
    setPlayList({
      cancion: "",
      artista: "",
    });
  };

  const addMensaje = async (item: MensajeData) => {
    const uuid = uuidv4();

    await postMensaje({
      ...item,
      uid: uuid,
      invitado: data?.invitado ?? "",
      fecha: new Date().toISOString(),
    });

    onClosePlayList("submit");
    setMensaje({
      mensaje: "",
    });
  };

  const confirmation = async (c: number) => {
    if (data) {
      await putData({ ...data, estado: c });
      onCloseConfirm("submit");
    }
  };

  useEffect(() => {
    if (showOpenSnackbar || showOpenPutSnackbar || showOpenMensajeSnackbar) {
      setOpenSnackbar(true);
    }
  }, [showOpenSnackbar, showOpenPutSnackbar, showOpenMensajeSnackbar]);

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

  if (loading) {
    return (
      <StyleContainerLoading>
        <div>Loading...</div>
      </StyleContainerLoading>
    );
  }

  if (error) {
    return (
      <StyleContainerLoading>
        <div>Error cargando datos...</div>
      </StyleContainerLoading>
    );
  }

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={severity || putSeverity || severityMensaje}>
          {message || putMessage || messageMensaje}
        </Alert>
      </Snackbar>
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

        <Parallax speed={-5}>
          <StyleContainerSaveDateText>
            <StyleContainerLogogo>
              <StyleLogoTitulo>Mishel</StyleLogoTitulo>
              <StyleLogoSunTitulo>CERMEÑO GOMEZ</StyleLogoSunTitulo>
            </StyleContainerLogogo>
            <StyleTextSaveDate>
              <StyleTextSubFecha>GUARDA LA FECHA</StyleTextSubFecha>
              <StyleTextFecha>02.11.2025</StyleTextFecha>
              <StyleTextSubFecha>MIS QUINCE</StyleTextSubFecha>
            </StyleTextSaveDate>
          </StyleContainerSaveDateText>
        </Parallax>
      </StyleContainerSaveDate>

      <StyleContainerBendicion>
        <Parallax opacity={[0.5, 1]} speed={-1}>
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
                <StyleTextRegular>
                  'Hoy la quinceañera soy yo y quiero que me acompañes a
                  celebrar este día lleno de sorpresas y diversión.'
                  <br />
                  <b>MISHEL CERMEÑO GOMEZ</b>{" "}
                </StyleTextRegular>
                <StyleImgBendicion src={bendicion} alt="bendicion" />

                <StyleTextNosotros
                  sx={{
                    marginTop: 5,
                  }}
                >
                  MI MAMÁ
                </StyleTextNosotros>
                <StyleLogoAmpersand>
                  <h2>Sindy Gomez</h2>
                </StyleLogoAmpersand>
              </Grid>
            </Grid>
          </Container>
        </Parallax>
      </StyleContainerBendicion>

      <StyleContainerInvitacion>
        <img
          src={honorX1}
          srcSet={`
            ${honorX1} 480w,
            ${honorX2} 768w,
            ${honorX3} 1200w
          `}
          sizes="(max-width: 480px) 480px,
             (max-width: 768px) 768px,
             1200px"
          alt="Save the date"
          loading="lazy"
          style={{ width: "100%", height: "auto" }}
        />
      </StyleContainerInvitacion>

      <StyleContainerInvitados>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 10, sm: 10, md: 10, lg: 10 }}
              offset={{ xs: 1, sm: 1, md: 1, lg: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <StyleTextRegularBold
                sx={{
                  marginTop: "0px",
                  marginBottom: "0px",
                  color: "#242522",
                }}
              >
                Tiene el honor de invitarte a
              </StyleTextRegularBold>
              <StyleTextCursiva
                sx={{
                  marginTop: "10px",
                  marginBottom: "0px",
                  fontSize: "2rem",
                }}
              >
                Mis Quince Años
              </StyleTextCursiva>
              <StyleTextRegular>
                Este es un día muy especial y nos encantaría compartirlo
                contigo.
              </StyleTextRegular>
              <StyleTextNosotros sx={{ marginBottom: 0 }}>
                {data?.dirigida}
              </StyleTextNosotros>
              <StyleTextRegularBold
                sx={{
                  fontSize: "1.2rem",
                  marginTop: 0,
                  textTransform: "uppercase",
                  color: "#A251FB",
                }}
              >
                {data?.invitado}
              </StyleTextRegularBold>
              <StyleImgAnillo src={copas} alt="copas" />
              <StyleTextNosotros sx={{ marginBottom: 0, marginTop: 1 }}>
                DOMINGO
              </StyleTextNosotros>
              <StyleTextFecha sx={{ marginBottom: 2 }}>02.11.25</StyleTextFecha>
              <WLButtons
                onClick={() => window.open(googleCalendarLink, "_blank")}
                label="Agendar fecha"
                icon={
                  <ContainerIconBtn>
                    <span>12</span>
                    <CalendarTodayOutlinedIcon />
                  </ContainerIconBtn>
                }
              />
              <StyleTextNosotros sx={{ marginBottom: 0, marginTop: 5 }}>
                Faltan
              </StyleTextNosotros>
              <Cronometro />
            </Grid>
          </Grid>
        </Container>
      </StyleContainerInvitados>

      <StyleContainerLugar>
        <img
          className="imgcastillo"
          src={castilloX1}
          srcSet={`
            ${castilloX1} 480w,
            ${castilloX2} 768w,
            ${castilloX3} 1200w
          `}
          sizes="(max-width: 480px) 480px,
             (max-width: 768px) 768px,
             1200px"
          alt="Save the date"
          loading="lazy"
          style={{ width: "100%", height: "auto" }}
        />
        <StyleFondoLugar></StyleFondoLugar>
      </StyleContainerLugar>

      <StyleContainerRecepcion>
        <StyleImgAnillo src={lugar} alt="lugar" />
        <StyleTextCursiva
          sx={{
            marginTop: "0px",
            marginBottom: "0px",
            color: "#fff",
            fontSize: "1.2rem",
          }}
        >
          Recepción
        </StyleTextCursiva>
        <StyleTextNosotros
          sx={{ marginBottom: 0, marginTop: 5, color: "#fff" }}
        >
          8:00PM
        </StyleTextNosotros>
        <StyleTextRegularBold
          sx={{
            fontSize: "1.2rem",
            marginTop: 0,
            marginBottom: 0,
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          SALON DE EVENTOS CAYENA REAL
        </StyleTextRegularBold>
        <StyleTextRegular sx={{ marginBottom: 2, marginTop: 0, color: "#fff" }}>
          Cra.7H #44-39, Barranquilla, Colombia
        </StyleTextRegular>
        <WLButtons
          onClick={() =>
            window.open("https://maps.app.goo.gl/g2pCohsBhBVHVGY38", "_blank")
          }
          label="Ver en el mapa"
          colorLight={true}
          icon={
            <ContainerIconBtn>
              <PlaceIcon />
            </ContainerIconBtn>
          }
        />
      </StyleContainerRecepcion>

      <StyleContainerVarios>
        <StyleContainerParalax>
          <Parallax translateY={["-50px", "0px"]}>
            <StyleBacgroundParalax></StyleBacgroundParalax>
          </Parallax>
        </StyleContainerParalax>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 10, sm: 10, md: 10, lg: 10 }}
              offset={{ xs: 1, sm: 1, md: 1, lg: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "60px",
              }}
            >
              <Items
                icono={zapatos}
                titulo="Código de Vestimenta"
                subtitulo="ROPA FORMAL"
                body="Prepárate para una noche de glamour y elegancia ¡¡ guarda el  <b>lila</b> para la quinceañera."
                btnLabel="Tablero pinterest"
                onClick={() =>
                  window.open("https://pin.it/2WO1M4wVE", "_blank")
                }
              />
            </Grid>

            <Grid
              size={{ xs: 10, sm: 10, md: 10, lg: 10 }}
              offset={{ xs: 1, sm: 1, md: 1, lg: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "60px",
              }}
            >
              <Items
                icono={musica}
                titulo="Lista de reproducción"
                subtitulo="SUGERENCIA DE CANCIONES"
                body="En mi fiesta la <b>música</b> es importante y si deseas puedes compartir alguna <b>canción</b> para incluir en mi playlist"
                btnLabel="Agregar canción"
                onClick={() => setOpen(true)}
              />
              <DialogPlaylist
                open={open}
                handleClose={(type) => onClosePlayList(type)}
                onAction={(item) => addCancion(item)}
                postLoading={postLoading}
                playList={playList}
                setPlayList={setPlayList}
              />
            </Grid>

            <Grid
              size={{ xs: 10, sm: 10, md: 10, lg: 10 }}
              offset={{ xs: 1, sm: 1, md: 1, lg: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "60px",
              }}
            >
              <Items
                icono={mensajeicon}
                titulo="Buzón de deseos"
                subtitulo="Nos encantaría leer tus buenos deseos."
                body="!déjame saber que deseas para mi en esta fecha y recordarlo por siempre!"
                btnLabel="Enviar mensaje"
                onClick={() => setOpenMensaje(true)}
              />
              <DialogMensaje
                open={openMensaje}
                handleClose={(type) => onCloseMensaje(type)}
                onAction={(item) => addMensaje(item)}
                postLoading={mensajeLoading}
                mensaje={mensaje}
                setMensaje={setMensaje}
              />
            </Grid>

            <Grid
              size={{ xs: 10, sm: 10, md: 10, lg: 10 }}
              offset={{ xs: 1, sm: 1, md: 1, lg: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "60px",
              }}
            >
              <Items
                icono={regalo}
                titulo="Regalos"
                subtitulo="SUGERENCIA DE REGALOS"
                body="tu presencia es un gran detalle para mi, pero si deseas puedes obsequiarme un <b>detalle físico o lluvia de sobre.</b>"
              />
            </Grid>
          </Grid>
        </Container>
      </StyleContainerVarios>

      <StyleContainerPhotos>
        <img
          src={photos1X1}
          srcSet={`
            ${photos1X1} 480w,
            ${photos1X2} 768w,
            ${photos1X3} 1200w
          `}
          sizes="(max-width: 480px) 480px,
             (max-width: 768px) 768px,
             1200px"
          alt="Save the date"
          loading="lazy"
          style={{ width: "49%", height: "auto" }}
        />
        <img
          src={photos2X1}
          srcSet={`
            ${photos2X1} 480w,
            ${photos2X2} 768w,
            ${photos2X3} 1200w
          `}
          sizes="(max-width: 480px) 480px,
             (max-width: 768px) 768px,
             1200px"
          alt="Save the date"
          loading="lazy"
          style={{ width: "49%", height: "auto" }}
        />
        <StyleContainerTextPhotos>
          <StyleContainerLogoPq>
            <StyleLogoTituloPq>Mishel</StyleLogoTituloPq>
            <StyleLogoSunTituloPq>CERMEÑO GOMEZ</StyleLogoSunTituloPq>
          </StyleContainerLogoPq>
          <StyleTextHastag>
            <StyleTextRegularBold
              style={{
                fontSize: "25px",
                marginTop: "0px",
                marginBottom: "0px",
                lineHeight: "25px",
              }}
            >
              2.11.25
            </StyleTextRegularBold>
            <StyleTextRegular
              style={{
                fontSize: "12px",
                marginTop: "0px",
                marginBottom: "5px",
              }}
            >
              #QuinceDeMishel
            </StyleTextRegular>
          </StyleTextHastag>
        </StyleContainerTextPhotos>
      </StyleContainerPhotos>

      <Container maxWidth="sm" sx={{ marginTop: "10px" }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <StyleTextRegular
              style={{
                marginTop: "0px",
                marginBottom: "0px",
                color: "#a251fb",
              }}
            >
              Queremos ver las fotos que publiques en tus redes sociales, usa el{" "}
              <b>#BodaW&L</b> para verlas todas en un mismo lugar.
            </StyleTextRegular>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 10, sm: 10, md: 10, lg: 10 }}
            offset={{ xs: 1, sm: 1, md: 1, lg: 1 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "60px",
            }}
          >
            <Items
              titulo="Cupos"
              subtitulo="HEMOS RESERVADO"
              body={`<b>${data?.cupos}</b> lugares en su honor`}
              cupos={data?.cupos as number}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid
            size={{ xs: 10, sm: 10, md: 10, lg: 10 }}
            offset={{ xs: 1, sm: 1, md: 1, lg: 1 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "60px",
            }}
          >
            <Items
              titulo="Niños"
              subtitulo="SON BIENVENIDOS"
              body="Nos encantaría que los niños nos acompañen en esta celebración tan especial. Contamos contigo para su constante supervisión."
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid
            size={{ xs: 10, sm: 10, md: 10, lg: 10 }}
            offset={{ xs: 1, sm: 1, md: 1, lg: 1 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "60px",
            }}
          >
            <Items
              titulo="Confirmar asistencia"
              body="Tu presencia es muy importante para nosotros, por favor confírmanos tu asistencia antes del 29 de octubre."
              btnLabel={data?.estado === 1 ? "No asistire" : "Asistire"}
              onClick={() => setOpenConfirm(true)}
              btnIcon={
                <ContainerIconBtn>
                  <span>12</span>
                  <CalendarTodayOutlinedIcon />
                </ContainerIconBtn>
              }
            />
            {data && (
              <DialogConfirmacion
                open={openConfirm}
                handleClose={(type) => onCloseConfirm(type)}
                onAction={(c) => confirmation(c)}
                postLoading={putLoading}
                invitado={data as unknown as InvitadosData}
              />
            )}
          </Grid>
        </Grid>
      </Container>

      <StyleContainerDespedida>
        <img
          src={despedidaX1}
          srcSet={`
            ${despedidaX1} 480w,
            ${despedidaX2} 768w,
            ${despedidaX3} 1200w
          `}
          sizes="(max-width: 480px) 480px,
             (max-width: 768px) 768px,
             1200px"
          alt="Save the date"
          loading="lazy"
          style={{ width: "100%", height: "auto" }}
        />
        <Container maxWidth="sm" sx={{ marginTop: "10px" }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <StyleTextRegular
                style={{
                  marginTop: "0px",
                  marginBottom: "0px",
                  color: "#a251fb",
                }}
              >
                Con mucha alegría espero este dia y vivir una fecha memorable
                junto con mi familia y las personas que han sido parte de mi
                historia.
              </StyleTextRegular>
              <StyleContainerLogoPq sx={{ marginTop: 5 }}>
                <StyleLogoTituloPq>Mishel</StyleLogoTituloPq>
                <StyleLogoSunTituloPq>CERMEÑO GOMEZ</StyleLogoSunTituloPq>
              </StyleContainerLogoPq>
            </Grid>
          </Grid>
        </Container>
      </StyleContainerDespedida>
    </>
  );
}

export default Home;
