import { Paper, Typography, Box, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';

const eventList = [
  { id: 1, date: 'Nov 28, 2024', type: 'Exam', description: 'Mathematics Final Exam' },
  { id: 2, date: 'Dec 2, 2024', type: 'Paper', description: 'Submit Research Paper on AI' },
  { id: 3, date: 'Dec 5, 2024', type: 'Exam', description: 'Physics Midterm Exam' },
  { id: 4, date: 'Dec 10, 2024', type: 'Event', description: 'Hackathon: Coding for Sustainability' },
  { id: 5, date: 'Dec 15, 2024', type: 'Exam', description: 'Computer Science Final Exam' },
  { id: 6, date: 'Dec 18, 2024', type: 'Paper', description: 'Submit Thesis Draft' },
];

const Events = () => {
  return (
    <Paper sx={paperStyle}>
      <Typography variant="h6" sx={headerStyle}>
        Upcoming Events
      </Typography>
      <Divider />
      <List sx={listStyle}>
        {eventList.map((event) => (
          <ListItem key={event.id} sx={listItemStyle}>
            <Box sx={eventDateStyle}>
              <Typography variant="body2" color="text.secondary">
                {event.date}
              </Typography>
            </Box>
            <Box sx={eventContentStyle}>
              <Chip
                label={event.type}
                color={event.type === 'Exam' ? 'primary' : event.type === 'Paper' ? 'secondary' : 'default'}
                size="small"
                sx={chipStyle}
              />
              <ListItemText primary={event.description} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Events;

// ---------- Styles ----------

const paperStyle = {
  height: '40%',
  mt: 2,
  borderRadius: 2,
  boxShadow: 2,
  bgcolor: 'background.paper',
  p: 2,
  overflow: 'hidden',
  '&:hover': {
    overflowY: 'auto',
  },
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: 8,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
};

const headerStyle = {
  fontWeight: 'bold',
  mb: 1,
};

const listStyle = {
  maxHeight: '100%',
  overflowY: 'auto',
  mt: 2,
  pl: 0,
};

const listItemStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 2,
  pl: 0,
  pb: 2,
  position: 'relative',
  '&:last-child': {
    pb: 0,
  },
};

const eventDateStyle = {
  minWidth: '100px',
  textAlign: 'right',
};

const eventContentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
};

const chipStyle = {
  mb: 0.5,
};
