import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Navegacion from "../components/navegacion";

function DashboardLayout() {
  return (
    <React.Fragment>
      <Container maxWidth={false} disableGutters={true}>
        <Navegacion />
        <Outlet />
      </Container>
    </React.Fragment>
  );
}

export default DashboardLayout;
