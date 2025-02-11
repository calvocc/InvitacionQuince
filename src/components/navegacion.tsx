import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../context/auth-context";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#686754",
});
const StyleButton = styled(Button)({
  fontFamily: "Poppins, serif",
  fontWeight: 600,
  color: "#fff",
  backgroundColor: "transparent",
  margin: "0px 15px",
  "&:hover": {
    color: "#9aa098",
  },
});

const pages = ["invitados", "mensajes", "playlist"];
function Navegacion() {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (ruta: string) => {
    setAnchorElNav(null);
    const path =
      ruta === "invitados"
        ? "dashboard"
        : ruta === "mensajes"
        ? "dashboard/mensajes"
        : "dashboard/playlist";
    navigate(`/${path}`);
  };

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Wilson & Luisa
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Wilson & Luisa
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            {pages.map((page) => (
              <StyleButton
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ color: "white", display: "block" }}
              >
                {page}
              </StyleButton>
            ))}
            <StyleButton
              onClick={signOut}
              sx={{ color: "white", display: "block" }}
            >
              Sign Out
            </StyleButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Navegacion;
