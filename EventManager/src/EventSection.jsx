// EventSection.jsx
import React from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';

const EventSection = ({ category }) => {
  // Sample event data
  const events = [
    {
      id: 1,
      title: 'Community Festival',
      date: '2024-09-20',
      location: 'The Gardens',
      isVirtual: false,
      description: 'Join us for a day of fun and festivities at The Gardens!',
    },
    {
      id: 2,
      title: 'Online Coding Workshop',
      date: '2024-09-25',
      location: 'Online',
      isVirtual: true,
      description: 'Learn to code in this interactive online workshop!',
    },
    // Add more sample events as needed
  ];

  // Filter events based on the selected category (for now, we will show all events)
  const filteredEvents = events.filter(event => {
    // Here you can add logic to filter events based on category if needed
    return true; // For now, return all events
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Events {category}</Typography>
      <Grid container spacing={2}>
        {filteredEvents.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">{event.title}</Typography>
              <Typography variant="body2">{event.date}</Typography>
              <Typography variant="body2">{event.location}</Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>{event.isVirtual ? "Virtual Event" : "Physical Event"}</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>{event.description}</Typography>
              <Box sx={{ marginTop: 2 }}>
                <Button variant="outlined" color="primary" size="small">Like</Button>
                <Button variant="outlined" color="secondary" size="small" sx={{ marginLeft: 1 }}>Share</Button>
                <Button variant="outlined" size="small" sx={{ marginLeft: 1 }}>Comment</Button>
                <Button variant="outlined" size="small" sx={{ marginLeft: 1 }}>Flag</Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventSection;
