import { Paper, Typography, Box, Divider, List, ListItem, ListItemText } from '@mui/material';

const News = () => {
  return (
    <Paper sx={paperStyle}>
      <Typography variant="h6" sx={headerStyle}>
        Latest news
      </Typography>
      <Divider />
      <List sx={listStyle}>
        {newsItems.map((item) => (
          <ListItem key={item.id} sx={listItemStyle} disablePadding>
            <Box sx={timelineDot} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                {item.date}
              </Typography>
              <ListItemText primary={item.content} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default News;

// ---------- Mock Data ----------

const newsItems = [
  { id: 1, date: '2 days ago', content: 'University opens enrollment for 2024 academic year.' },
  { id: 2, date: '3 days ago', content: 'New Career Plan: Data Science and AI launched!' },
  { id: 3, date: '3 days ago', content: 'Workshop on modern programming practices scheduled.' },
  { id: 4, date: '4 days ago', content: 'Scholarship applications for 2024 now open.' },
];

// -------- Styles ----------

const paperStyle = {
  height: '100%',
  mt: 2,
  borderRadius: 2,
  boxShadow: 2,
  bgcolor: 'background.paper',
  padding: 3,
};

const headerStyle = {
  mb: 1,
};

const listStyle = {
  mt: 2,
  pl: 2,
};

const listItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2,
  pl: 2,
  pb: 2,
  pt: 0,
  borderLeft: 1,
  borderColor: 'divider',
  position: 'relative',
  '&:last-child': {
    pb: 0,
  },
};

const timelineDot = {
  width: 10,
  height: 10,
  bgcolor: 'primary.main',
  borderRadius: '50%',
  position: 'absolute',
  left: -6,
  top: 3,
};
