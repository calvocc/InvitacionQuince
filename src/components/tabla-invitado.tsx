import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EditIcon from "@mui/icons-material/Edit";

import WLButtonGroup from "./ui-theme/wl-button-group";

import { InvitadosData } from "../routes/invitados";

interface TablaProps {
  data: Array<InvitadosData>;
  columns: Array<{ id: string; label: string }>;
  onEdit: (user: InvitadosData) => void;
  onDelete: (uid: string) => void;
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

const Tabla: React.FC<TablaProps> = ({ data, columns, onEdit, onDelete }) => {
  const waMessage = (user: InvitadosData) =>
    `🎉✨ ¡Hola ${user.invitado}! ✨🎉 Tenemos el placer de invitarte a un día muy especial para nosotros: ¡nuestra boda! 💍❤️ Hemos preparado una invitación digital con todos los detalles. Haz clic aquí para verla 👉 http://localhost:5173/${user.uid}`;

  const mapEstado = (estado: number) => {
    switch (estado) {
      case 0:
        return "Pendiente";
      case 1:
        return "Confirmado";
      case 2:
        return "Cancelado";
      default:
        return "No definido";
    }
  };

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
          {data.map((row: InvitadosData, index: number) => (
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
                                window.open(
                                  `https://wa.me/${
                                    row.celular
                                  }?text=${waMessage(row)}`,
                                  "_blank"
                                );
                              }}
                            >
                              <WhatsAppIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar invitacion">
                            <IconButton
                              size="small"
                              onClick={() => onEdit(row)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar invitacion">
                            <IconButton
                              size="small"
                              onClick={() => onDelete(row.uid as string)}
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
                        row[column.id as keyof InvitadosData] as number
                      )}
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={column.id}>
                    {row[column.id as keyof InvitadosData]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </TableStyle>
    </TableContainer>
  );
};

export default Tabla;
