import { Box } from '@mui/material';

const CircularYear = ({ color }: CircularYearProps) => {
  return (
    <Box sx={mainBoxStyle(color)}>
      <Box sx={innerBoxStyle(color)} />
    </Box>
  );
};

export default CircularYear;

// ---------- Props ----------

interface CircularYearProps {
  color: string;
}

// ---------- Styles ----------

const mainBoxStyle = (color: string) => ({
  width: 16, // Set explicit width
  height: 16, // Set explicit height
  borderRadius: '50%',
  backgroundColor: 'background.paper', // White background
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${color}`, // Colored border
  marginRight: 1,
});

const innerBoxStyle = (color: string) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: color,
});
