import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Paper, Typography, Box, Divider, List, ListItem, Chip, IconButton } from '@mui/material';

const EVENTS_PER_PAGE = 4;

const Events = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(eventList.length / EVENTS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const paginatedEvents = eventList.slice(currentPage * EVENTS_PER_PAGE, (currentPage + 1) * EVENTS_PER_PAGE);

  return (
    <Paper sx={paperStyle}>
      <Box sx={headerContainerStyle}>
        <Box sx={iconContainerStyle}>
          <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Typography variant="h6" sx={headerStyle}>
          Upcoming Events
        </Typography>
      </Box>
      <List sx={listStyle}>
        {paginatedEvents.map((event, index) => (
          <Box key={event.id}>
            {index === 0 || isNewMonth(eventList, currentPage * EVENTS_PER_PAGE + index) ? (
              <Box sx={monthYearDividerStyle}>
                <Typography variant="subtitle2" sx={monthYearStyle}>
                  {getMonthYear(event.date)}
                </Typography>
                <Divider sx={dividerAfterMonthStyle} />
              </Box>
            ) : null}
            <ListItem sx={listItemStyle}>
              <Box sx={daySectionStyle}>
                <Typography variant="body2" sx={dayNameStyle}>
                  {getDayName(event.date)}
                </Typography>
                <Typography variant="h5" sx={dayNumberStyle}>
                  {getDayNumber(event.date)}
                </Typography>
              </Box>
              <Box sx={eventDetailsStyle}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label={event.type} size="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {event.time}
                  </Typography>
                </Box>
                <Typography variant="body1">{event.description}</Typography>
              </Box>
            </ListItem>
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default Events;

// ---------- Mock Data ----------

const eventList: Event[] = [
  { id: 1, date: 'Thu, Nov 28, 2024', time: '3:30 pm - 5:00 pm', description: 'Mathematics Final Exam', type: 'Exam' },
  { id: 2, date: 'Sun, Dec 2, 2024', time: '12:30 pm - 2:00 pm', description: 'Submit Research Paper on AI', type: 'Paper' },
  { id: 3, date: 'Wed, Dec 5, 2024', time: '7:00 am - 9:00 am', description: 'Physics Midterm Exam', type: 'Exam' },
  { id: 4, date: 'Thu, Dec 10, 2024', time: 'All Day', description: 'Hackathon: Coding for Sustainability', type: 'Event' },
  { id: 5, date: 'Fri, Dec 15, 2024', time: '2:00 pm - 3:00 pm', description: 'Team Meeting', type: 'Meeting' },
  { id: 6, date: 'Sat, Dec 20, 2024', time: '11:00 am - 1:00 pm', description: 'Volunteer Activity', type: 'Event' },
];

// ---------- Helper Functions ----------

const getMonthYear = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' });
  const monthUpper = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  return `${monthUpper} ${year}`;
};

const getDayName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { weekday: 'short' });
};

const getDayNumber = (dateString: string) => {
  const date = new Date(dateString);
  return date.getDate();
};

const isNewMonth = (events: Event[], index: number) => {
  const currentMonth = getMonthYear(events[index].date);
  const previousMonth = getMonthYear(events[index - 1]?.date);
  return currentMonth !== previousMonth;
};

// ---------- Styles ----------

const paperStyle = {
  mt: 2,
  borderRadius: 2,
  boxShadow: 2,
  bgcolor: 'background.paper',
  padding: 3,
};

const headerContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const iconContainerStyle = {
  paddingRight: 2,
};

const headerStyle = {
  mb: 0,
};

const listStyle = {
  maxHeight: '100%',
  overflowY: 'auto',
  pl: 0,
};

const monthYearDividerStyle = {
  display: 'flex',
  alignItems: 'center',
  my: 2,
};

const dividerAfterMonthStyle = {
  flexGrow: 1,
  borderBottom: '1px solid',
  borderColor: 'divider',
  ml: 2,
};

const monthYearStyle = {
  fontWeight: 'bold',
  color: 'text.secondary',
  fontSize: '0.9rem',
};

const listItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2,
  pl: 0,
  pb: 2,
};

const daySectionStyle = {
  minWidth: '60px',
  textAlign: 'center',
};

const dayNameStyle = {
  fontSize: '0.75rem',
  fontWeight: 400,
  color: 'text.secondary',
};

const dayNumberStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'text.primary',
};

const eventDetailsStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
};

// ---------- Types ----------

type Event = {
  id: number;
  date: string;
  time: string;
  description: string;
  type: string;
};
