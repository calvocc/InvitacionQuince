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

import { Invitados } from "../routes/invitados";

interface TablaProps {
  data: Array<Invitados>;
  columns: Array<{ id: string; label: string }>;
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

const Tabla: React.FC<TablaProps> = ({ data, columns }) => {
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
          {data.map((row: Invitados, index: number) => (
            <TableRow key={index}>
              {columns.map((column) => {
                if (column.id === "acciones") {
                  return (
                    <TableCell key={column.id} align="right">
                      <WLButtonGroup>
                        <>
                          <Tooltip title="Invitar por whatsapp">
                            <IconButton size="small">
                              <WhatsAppIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar invitacion">
                            <IconButton size="small">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar invitacion">
                            <IconButton size="small">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      </WLButtonGroup>
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={column.id}>
                    {row[column.id as keyof Invitados]}
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
