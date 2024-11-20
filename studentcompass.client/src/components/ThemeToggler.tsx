import { useEffect } from "react";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import { Button, useColorScheme, useMediaQuery, Box } from "@mui/material";

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
      onClick={() => (mode === "light" ? setMode("dark") : setMode("light"))}
      className="focus:outline-none transition ease-in-out duration-300 dark:invert select-none"
    >
      <Box
        className={`w-6 h-6 transition-transform duration-500 ${
          mode === "dark" ? "rotate-0" : "rotate-180"
        }`}
      >
        <BrightnessMediumIcon
          color="primary"
          aria-label="Theme Toggler"
          width={24}
          height={24}
        />
      </Box>
    </Button>
  );
};

export default ThemeToggler;

// -------- Styles ----------
