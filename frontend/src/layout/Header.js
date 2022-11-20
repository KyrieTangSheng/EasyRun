import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

function Header() {
  let pages = [];
  let settings = [];

  if (localStorage.userType) {
    if (localStorage.userType === "student") {
      pages = ["Institutions", "Programs", "Upload Application Result"];
      settings = ["Profile", "Logout"];
    } else if (localStorage.userType === "instructor") {
      pages = [
        "Institutions",
        "Programs",
        "Upload Application Result",
        "Send a New Contract",
      ];
      settings = ["Profile", "Logout"];
    }
  } else {
    pages = ["Institutions", "Programs"];
    settings = ["Login"];
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "rgb(19 115 134)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* App logo */}
          <a href={localStorage.isLoggedIn ? "./" : "../login"}>
            <img
              alt="logo"
              src="/favicon.png"
              style={{ height: 50, width: 50, padding: "8px" }}
            />
          </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={localStorage.isLoggedIn ? "./" : "./login"}
            sx={{
              mr: 2,
              display: { xs: "block", md: "block" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EasyRun
          </Typography>

          {/* App Content */}
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
              // anchorEl={anchorElNav}
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
              onClick={() => {
                console.log("hi");
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={(e) => {
                    handleCloseNavMenu(e);
                    console.log(page);
                    if (page === "Institutions") {
                      window.location.href = "../institutions";
                    } else if (page === "Programs") {
                      window.location.href = "../programs";
                    }
                  }}
                >
                  <Typography variant="text">
                    <Link
                      to={
                        page === "Insitutions"
                          ? "../institutions"
                          : page === "Programs"
                          ? "../programs"
                          : "./"
                      }
                    >
                      {" "}
                      {page}{" "}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          {/* Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Logout") {
                      localStorage.clear();
                      window.location.href = "../login";
                    } else if (setting === "Login") {
                      window.location.href = "../login";
                    } else if (setting === "Profile") {
                      window.location.href = "../profile";
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
