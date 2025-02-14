import React from "react";
import { useTimer } from "react-timer-hook";

import { styled } from "@mui/material/styles";

const StyleTextCronometro = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 300px;
  span {
    font-size: 40px;
    line-height: 40px;
    color: #686754;
    text-align: center;
    font-weight: 600;
    position: relative;
    margin: 0px 5px;
    width: 60px;
    small {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      display: block;
      font-size: 10px;
      line-height: 10px;
      color: #686754;
    }
    &.puntos {
      width: 10px;
    }
  }
`;

const Cronometro: React.FC = () => {
  const time = new Date("2025-04-12T16:00:00");
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <StyleTextCronometro>
      <span>
        {days}
        <small>Días</small>
      </span>
      <span className="puntos">:</span>
      <span>
        {hours}
        <small>Horas</small>
      </span>
      <span className="puntos">:</span>
      <span>
        {minutes}
        <small>Minutos</small>
      </span>
      <span className="puntos">:</span>
      <span>
        {seconds}
        <small>Segundos</small>
      </span>
    </StyleTextCronometro>
  );
};

export default Cronometro;
