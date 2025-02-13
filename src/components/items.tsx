import React from "react";
import WLButtons from "../components/ui-theme/wl-button";
import {
  StyleImgAnillo,
  StyleTextCursiva,
  StyleTextRegularSemiBold,
  StyleTextRegular,
} from "../routes/home";

interface ItemsProps {
  icono: string;
  titulo: string;
  subtitulo: string;
  body: string;
  btnLabel?: string;
  onClick?: () => void;
}

const Items: React.FC<ItemsProps> = ({
  icono,
  titulo,
  subtitulo,
  body,
  btnLabel,
  onClick,
}) => {
  return (
    <>
      <StyleImgAnillo
        src={icono}
        alt="zapatos"
        style={{ marginBottom: "20px" }}
      />
      <StyleTextCursiva
        sx={{
          marginTop: "0px",
          marginBottom: "0px",
          fontSize: "1.5rem",
        }}
      >
        {titulo}
      </StyleTextCursiva>
      <StyleTextRegularSemiBold sx={{ marginBottom: 0, marginTop: 0 }}>
        {subtitulo}
      </StyleTextRegularSemiBold>
      <StyleTextRegular
        sx={{ marginBottom: 2, marginTop: 0 }}
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {btnLabel && (
        <WLButtons onClick={onClick} label={btnLabel} colorLight={false} />
      )}
    </>
  );
};

export default Items;
