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
    encodeURIComponent(
      `🎉✨ ¡Hola ${user.invitado}! ✨🎉\n\nTenemos el placer de invitarte a un día muy especial para nosotros: ¡nuestra boda! 💍❤️\n\nHemos preparado una invitación digital con todos los detalles.\n\nCon cariño,\n❤️ Wilson & Luisa.\n\nHaz clic aquí para verla 👉 ${baseUrl}/${user.uid}`
    );

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
                                          window.open(
                                            `https://wa.me/${
                                              row.celular
                                            }?text=${waMessage(row)}`,
                                            "_blank"
                                          );
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
