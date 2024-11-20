import ThemeToggler from "./ThemeToggler";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={appBarStyle}>
      <Toolbar sx={toolbarStyle}>
        <Typography
          to="/"
          variant="h6"
          sx={typographyStyle}
          component={RouterLink}
        >
          StudentCompass
        </Typography>
        <Box sx={boxStyle}>
          <Link
            component={RouterLink}
            to="/dashboard"
            underline="none"
            sx={linkStyle}
          >
            Dashboard
          </Link>
          <Link component={RouterLink} to="/me" underline="none" sx={linkStyle}>
            Me
          </Link>
          <Link
            component={RouterLink}
            to="/about"
            underline="none"
            sx={linkStyle}
          >
            About Us
          </Link>
        </Box>
        <ThemeToggler />
        <Box sx={boxThemeStyle}>
          <ThemeToggler />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

// -------- Styles ----------

const appBarStyle = {
  borderBottom: "1px solid",
  borderColor: "grey.400",
  backgroundColor: "background.default",
  color: "text.primary",
};

const toolbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "1200px",
  margin: "auto",
  padding: "16px",
  height: "80px",
};

const typographyStyle = {
  textDecoration: "none",
  color: "inherit",
  "&:hover": { color: "secondary.main" },
};

const boxStyle = { display: "flex", alignItems: "center", gap: 2 };

const linkStyle = {
  textDecoration: "none",
  color: "text.secondary",
  "&:hover": { color: "secondary.main" },
};

const boxThemeStyle = { pl: 6, pr: 3 };
