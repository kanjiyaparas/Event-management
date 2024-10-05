import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import api from "../api/api"; // Axios instance
import { format } from "date-fns";
import { Container, Typography, TextField, Select, MenuItem, Button, Grid, Paper, Box } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [locations, setLocations] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/all");
        const fetchedEvents = response.data;
        setEvents(fetchedEvents); 
        setFilteredEvents(fetchedEvents); 

        const uniqueLocations = [
          ...new Set(fetchedEvents.map((event) => event.location)),
        ];
        setLocations(uniqueLocations); 
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    handleFilterByTitle();
  }, [selectedTitle]); 
  const handleFilterByTitle = () => {
    let filtered = events;

    if (selectedTitle) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(selectedTitle.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleFilterByLocationAndDate = () => {
    let filtered = events;

    if (selectedLocation) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (event) => format(new Date(event.date), "yyyy-MM-dd") === selectedDate
      );
    }

    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setSelectedTitle(""); 
    setSelectedLocation("");
    setSelectedDate(""); 
    setFilteredEvents(events); 
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    // <div className="container mx-auto mt-8">
    //   <h1 className="text-3xl font-bold mb-8 text-gray-800">Upcoming Events</h1>

    //   {/* Filter UI */}
    //   <div className="flex flex-wrap justify-between items-center mb-8 p-4 border rounded-lg shadow-sm bg-white">
    //     {/* Event Title Filter */}
    //     <div className="flex flex-col mb-4 sm:mb-0">
    //       <label
    //         htmlFor="title"
    //         className="mb-1 text-sm font-medium text-gray-700"
    //       >
    //         Event Title
    //       </label>
    //       <input
    //         type="text"
    //         id="title"
    //         value={selectedTitle}
    //         onChange={(e) => setSelectedTitle(e.target.value)}
    //         placeholder="Search by event title"
    //         className="w-full sm:w-auto p-2 border rounded-md text-gray-700"
    //       />
    //     </div>

    //     {/* Location Filter (Dynamic Dropdown) */}
    //     <div className="flex flex-col mb-4 sm:mb-0">
    //       <label
    //         htmlFor="location"
    //         className="mb-1 text-sm font-medium text-gray-700"
    //       >
    //         Location
    //       </label>
    //       <select
    //         id="location"
    //         value={selectedLocation}
    //         onChange={(e) => setSelectedLocation(e.target.value)}
    //         className="w-full sm:w-auto p-2 border rounded-md text-gray-700"
    //       >
    //         <option value="">Select Location</option>
    //         {locations.map((location, index) => (
    //           <option key={index} value={location}>
    //             {location}
    //           </option>
    //         ))}
    //       </select>
    //     </div>

    //     {/* Date Filter */}
    //     <div className="flex flex-col mb-4 sm:mb-0">
    //       <label
    //         htmlFor="date"
    //         className="mb-1 text-sm font-medium text-gray-700"
    //       >
    //         Date
    //       </label>
    //       <input
    //         type="date"
    //         id="date"
    //         value={selectedDate}
    //         onChange={(e) => setSelectedDate(e.target.value)}
    //         className="w-full sm:w-auto p-2 border rounded-md text-gray-700"
    //       />
    //     </div>

    //     {/* Search Button */}
    //     <button
    //       onClick={handleFilterByLocationAndDate}
    //       className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
    //     >
    //       Search
    //     </button>

    //     {/* No Filter Button */}
    //     <button
    //       onClick={clearFilters}
    //       className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 ml-4"
    //     >
    //       No Filter
    //     </button>
    //   </div>

    //   {/* Events List */}
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
    //     {filteredEvents.length > 0 ? (
    //       filteredEvents.map((event) => (
    //         <EventCard
    //           key={event._id}
    //           id={event._id}
    //           title={event.title}
    //           date={event.date}
    //           location={event.location}
    //           imageUrl={event.imageUrl}
    //         />
    //       ))
    //     ) : (
    //       <p>No events available</p>
    //     )}
    //   </div>
    // </div>
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom align="center" color="textPrimary">
      Upcoming Events
    </Typography>

    {/* Filter UI */}
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Event Title Filter */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Event Title"
            variant="outlined"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            placeholder="Search by event title"
          />
        </Grid>

        {/* Location Filter (Dynamic Dropdown) */}
        <Grid item xs={12} sm={4}>
          <Select
            fullWidth
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            displayEmpty
            variant="outlined"
            inputProps={{ 'aria-label': 'Select Location' }}
          >
            <MenuItem value="" disabled>Select Location</MenuItem>
            {locations.map((location, index) => (
              <MenuItem key={index} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Date Filter */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label=""
            type="date"
            variant="outlined"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Grid>

        {/* Search Button */}
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color=""
            onClick={handleFilterByLocationAndDate}
            endIcon={<SearchIcon />}
            fullWidth
            sx={{color:"white" , backgroundColor:"black"}}
          >
            Search
          </Button>
        </Grid>

        {/* No Filter Button */}
        <Grid item xs={12} sm={3}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={clearFilters}
            startIcon={<ClearIcon />}
            fullWidth
          >
            No Filter
          </Button>
        </Grid>
      </Grid>
    </Paper>

    {/* Events List */}
    <Grid container spacing={3}>
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
            <EventCard
              id={event._id}
              title={event.title}
              date={event.date}
              location={event.location}
              imageUrl={event.imageUrl}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6" align="center" color="textSecondary">
            No events available
          </Typography>
        </Grid>
      )}
    </Grid>
  </Container>
  );
};

export default HomePage;
