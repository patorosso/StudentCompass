import { useEffect } from 'react';
import { useTheme } from '@mui/material';

const BackgroundUpdater = () => {
  const theme = useTheme();

  useEffect(() => {
    document.body.style.backgroundImage = theme.colorSchemes[theme.palette.mode].custom.backgroundImage;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';

    // eslint-disable-next-line
  }, [theme.palette.mode]);

  return null;
};

export default BackgroundUpdater;
