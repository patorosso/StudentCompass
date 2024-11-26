import { Paper, Typography, Box, Divider, List, ListItem } from '@mui/material';

const eventList: Event[] = [
  { id: 1, date: 'Thu, Nov 28, 2024', time: '3:30 pm - 5:00 pm', description: 'Mathematics Final Exam' },
  { id: 2, date: 'Sun, Dec 2, 2024', time: '12:30 pm - 2:00 pm', description: 'Submit Research Paper on AI' },
  { id: 3, date: 'Wed, Dec 5, 2024', time: '7:00 am - 9:00 am', description: 'Physics Midterm Exam' },
  { id: 4, date: 'Thu, Dec 10, 2024', time: 'All Day', description: 'Hackathon: Coding for Sustainability' },
];

const Events = () => {
  return (
    <Paper sx={paperStyle}>
      <Typography variant="h6" sx={headerStyle}>
        Upcoming Events
      </Typography>
      <List sx={listStyle}>
        {eventList.map((event, index) => (
          <Box key={event.id}>
            {/* Month-Year Divider */}
            {index === 0 || isNewMonth(eventList, index) ? (
              <Box sx={monthYearDividerStyle}>
                <Typography variant="subtitle2" sx={monthYearStyle}>
                  {getMonthYear(event.date)}
                </Typography>
                <Divider sx={dividerAfterMonthStyle} />
              </Box>
            ) : null}

            {/* Event Item */}
            <ListItem sx={listItemStyle}>
              {/* Day Section */}
              <Box sx={daySectionStyle}>
                <Typography variant="body2" sx={dayNameStyle}>
                  {getDayName(event.date)}
                </Typography>
                <Typography variant="h5" sx={dayNumberStyle}>
                  {getDayNumber(event.date)}
                </Typography>
              </Box>
              {/* Event Details */}
              <Box sx={eventDetailsStyle}>
                <Typography variant="body2" color="text.secondary">
                  {event.time}
                </Typography>
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

// ---------- Helper Functions ----------

// Extract the Month and Year from the date
const getMonthYear = (dateString: string) => {
  const date = new Date(dateString);
  // month with first letter capitalized, full year
  const month = date.toLocaleString('default', { month: 'long' });
  const monthUpper = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  return `${monthUpper} ${year}`;
};

// Get Day Name
const getDayName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { weekday: 'short' });
};

// Get Day Number
const getDayNumber = (dateString: string) => {
  const date = new Date(dateString);
  return date.getDate();
};

// Check if a New Month is Starting
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

const headerStyle = {
  mb: 1,
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
};
