import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";

const ThemeToggler = () => {
  const { mode, setMode } = useColorScheme();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    const preferedMode = prefersDarkMode ? "dark" : "light";
    setMode(preferedMode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersDarkMode]);

  return (
    <Button
      disableRipple
      style={buttonStyle}
      onClick={() => (mode === "light" ? setMode("dark") : setMode("light"))}
    >
      <Box style={boxStyle(mode)}>
        <BrightnessMediumIcon
          color="primary"
          style={iconStyle}
          aria-label="Theme Toggler"
        />
      </Box>
    </Button>
  );
};

export default ThemeToggler;

// -------- Styles ----------

const buttonStyle = {
  outline: "none",
  transition: "ease-in-out 300ms",
  cursor: "pointer",
  background: "transparent",
  border: "none",
};

const boxStyle = (mode: string | undefined) => ({
  width: "24px",
  height: "24px",
  transform: `rotate(${mode === "dark" ? "0" : "180deg"})`,
  transition: "transform 500ms",
});

const iconStyle = {
  width: "24px",
  height: "24px",
};
