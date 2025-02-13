import React from "react";
import { styled } from "@mui/material/styles";

import WLButtons from "../components/ui-theme/wl-button";
import {
  StyleImgAnillo,
  StyleTextCursiva,
  StyleTextRegularSemiBold,
  StyleTextRegular,
} from "../routes/home";

interface ItemsProps {
  icono?: string;
  titulo?: string;
  subtitulo?: string;
  body?: string;
  btnLabel?: string;
  onClick?: () => void;
  cupos?: number;
  btnIcon?: JSX.Element;
}

const StyleCupos = styled("ul")({
  display: "flex",
  listStyle: "none",
  padding: 0,
  margin: 0,
  "& li": {
    height: "25px",
    width: "25px",
    borderRadius: "50%",
    marginRight: "10px",
    marginBottom: "0px",
    border: "1px solid #686754",
  },
});

const Items: React.FC<ItemsProps> = ({
  icono,
  titulo,
  subtitulo,
  body,
  btnLabel,
  onClick,
  cupos,
  btnIcon,
}) => {
  return (
    <>
      {icono && (
        <StyleImgAnillo
          src={icono}
          alt="zapatos"
          style={{ marginBottom: "20px" }}
        />
      )}
      {titulo && (
        <StyleTextCursiva
          sx={{
            marginTop: "0px",
            marginBottom: "0px",
            fontSize: "1.5rem",
          }}
        >
          {titulo}
        </StyleTextCursiva>
      )}
      {subtitulo && (
        <StyleTextRegularSemiBold sx={{ marginBottom: 0, marginTop: 0 }}>
          {subtitulo}
        </StyleTextRegularSemiBold>
      )}
      {cupos && (
        <StyleCupos>
          {Array.from({ length: cupos < 4 ? 4 : cupos + 1 }, (_, index) => (
            <li
              key={index}
              style={{ backgroundColor: index < cupos ? "#9aa098" : "#fff" }}
            >
              {""}
            </li>
          ))}
        </StyleCupos>
      )}
      {body && (
        <StyleTextRegular
          sx={{ marginBottom: 2, marginTop: 0 }}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
      {btnLabel && (
        <WLButtons
          onClick={onClick}
          label={btnLabel}
          colorLight={false}
          icon={btnIcon}
        />
      )}
    </>
  );
};

export default Items;
