import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import WLButtonGroup from "./ui-theme/wl-button-group";
import WLTexts from "./ui-theme/wl-texts";

import { InvitadosData } from "../routes/invitados";
import { MensajesData } from "../routes/mensajes";
import { PlaylistData } from "../routes/playlist";

type TablaData = InvitadosData | MensajesData | PlaylistData;

interface TablaProps {
  data: Array<TablaData>;
  columns: Array<{ id: string; label: string }>;
  onEdit: (user: InvitadosData) => void;
  onDelete: (uid: string) => void;
  loadingData?: boolean;
  errorData?: string;
}

const TableStyle = styled(Table)`
  font-family: "Poppins", serif;
  thead {
    tr {
      th {
        font-family: "Poppins", serif;
        font-weight: 600;
      }
    }
  }
  tbody {
    tr {
      td {
        font-family: "Poppins", serif;
        font-weight: 400;
      }
    }
  }
`;

const Tabla: React.FC<TablaProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
  loadingData,
  errorData,
}) => {
  const baseUrl = window.location.origin;

  const waMessage = (user: TablaData) =>
    `https://api.whatsapp.com/send?text=🎉✨%20¡Hola%20${user.invitado}!%20✨🎉%20%0A%0ATenemos%20el%20placer%20de%20invitarte%20a%20la%20fiesta%20de%20quince%20años%20de%20Mishel.%20%0A%0ASerá%20un%20día%20muy%20especial%20para%20nosotros%20y%20nos%20encantaría%20que%20hicieras%20parte%20de%20este%20momento%20tan%20importante.%20💖%0A%0AHemos%20preparado%20una%20invitación%20digital%20con%20todos%20los%20detalles:%0A%0A👉%20Haz%20clic%20aquí%20para%20verla%20👉%20${baseUrl}/${user.uid}%2F1234%0A%0ACon%20cariño%2C%0A%0A❤️%20Sindy%20y%20Jhon`;

  const mapEstado = (estado: number) => {
    switch (estado) {
      case 0:
        return "Pendiente";
      case 1:
        return "Confirmado";
      case -1:
        return "Cancelado";
      default:
        return "No definido";
    }
  };
  if (errorData) {
    return (
      <Alert severity="error" sx={{ width: "100%" }}>
        {errorData}
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <TableStyle stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              if (column.id === "acciones") {
                return (
                  <TableCell key={column.id} align="right">
                    {column.label}
                  </TableCell>
                );
              }
              return <TableCell key={column.id}>{column.label}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {loadingData ? (
            <TableRow>
              <TableCell align="left" colSpan={columns.length}>
                <Box sx={{ width: "100%" }}>
                  <WLTexts>Cargando datos...</WLTexts>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell align="left" colSpan={columns.length}>
                    <Alert severity="warning" sx={{ width: "100%" }}>
                      No hay datos para mostrar
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {data.map((row: TablaData, index: number) => (
                    <TableRow key={index}>
                      {columns.map((column) => {
                        if (column.id === "acciones") {
                          return (
                            <TableCell key={column.id} align="right">
                              <WLButtonGroup>
                                <>
                                  <Tooltip title="Invitar por whatsapp">
                                    <IconButton
                                      size="small"
                                      onClick={() => {
                                        if ("celular" in row) {
                                          window.open(waMessage(row), "_blank");
                                        }
                                      }}
                                    >
                                      <WhatsAppIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Editar invitacion">
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        onEdit(row as InvitadosData)
                                      }
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Eliminar invitacion">
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        onDelete(row.uid as string)
                                      }
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              </WLButtonGroup>
                            </TableCell>
                          );
                        }
                        if (column.id === "estado") {
                          return (
                            <TableCell key={column.id}>
                              {mapEstado(
                                row[
                                  column.id as keyof TablaData
                                ] as unknown as number
                              )}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id}>
                            {row[column.id as keyof TablaData]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </>
              )}
            </>
          )}
        </TableBody>
      </TableStyle>
    </TableContainer>
  );
};

export default Tabla;
