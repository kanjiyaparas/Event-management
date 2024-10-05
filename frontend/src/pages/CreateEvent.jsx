import React, { useState } from "react";
import api from "../api/api"; // Assuming your axios instance is correctly configured
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Grid, Box, Paper, Avatar } from '@mui/material';
import { Event as EventIcon, Description as DescriptionIcon, LocationOn as LocationOnIcon, People as PeopleIcon, Image as ImageIcon } from '@mui/icons-material';


const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
  });
  const [image, setImage] = useState(null); // For storing the selected image file
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handles the input fields change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handles file change event
  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file in the state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for all fields
    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.date ||
      !eventData.location ||
      !eventData.maxAttendees
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Create FormData to handle text inputs and image upload
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("location", eventData.location);
    formData.append("maxAttendees", eventData.maxAttendees);
    if (image) {
      formData.append("image", image); // Append the image file only if it exists
    }

    try {
      const response = await api.post("/events/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure multipart data is set
        },
      });
      console.log("Event created successfully:", response.data);
      navigate("/my-events"); // Redirect to "My Events" page after creation
    } catch (error) {
      console.error("Error creating event:", error.response || error.message);
      setError(
        error.response?.data?.message ||
        "An error occurred while creating the event."
      );
    }
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="w-full max-w-md px-8 py-6 mx-auto bg-white shadow-md rounded-lg">
    //     <h2 className="text-2xl font-bold text-[#dc363c] mb-6">Create Event</h2>
    //     {error && <p className="text-red-500 mb-4">{error}</p>}
    //     <form onSubmit={handleSubmit} encType="multipart/form-data">
    //       <div className="mb-4">
    //         <label className="block text-gray-700 font-semibold mb-1">
    //           Event Title
    //         </label>
    //         <input
    //           type="text"
    //           name="title"
    //           value={eventData.title}
    //           onChange={handleChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
    //           placeholder="Enter event title"
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 font-semibold mb-1">
    //           Event Description
    //         </label>
    //         <textarea
    //           name="description"
    //           value={eventData.description}
    //           onChange={handleChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
    //           placeholder="Enter event description"
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 font-semibold mb-1">
    //           Event Date
    //         </label>
    //         <input
    //           type="date"
    //           name="date"
    //           value={eventData.date}
    //           onChange={handleChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 font-semibold mb-1">
    //           Location
    //         </label>
    //         <input
    //           type="text"
    //           name="location"
    //           value={eventData.location}
    //           onChange={handleChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
    //           placeholder="Enter location"
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 font-semibold mb-1">
    //           Max Attendees
    //         </label>
    //         <input
    //           type="number"
    //           name="maxAttendees"
    //           value={eventData.maxAttendees}
    //           onChange={handleChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
    //           placeholder="Enter max attendees"
    //           required
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <label className="block text-gray-700 font-semibold mb-1">
    //           Event Image
    //         </label>
    //         <input
    //           type="file"
    //           onChange={handleFileChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
    //           accept="image/*"
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full py-2 bg-[#093054] text-white font-semibold rounded-md hover:bg-[#102144] transition duration-200"
    //       >
    //         Create Event
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <Container maxWidth="md" sx={{mt:6, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Paper elevation={4} sx={{ padding: 4, borderRadius: 2, width: '100%' }}>
      <Typography variant="h4" component="h2" color="black" gutterBottom align="center">
        Create Event
      </Typography>
      {error && <Typography color="error" align="center" sx={{ marginBottom: 2 }}>{error}</Typography>}
      
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Title"
              variant="outlined"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
              InputProps={{
                startAdornment: (
                  <Avatar sx={{ backgroundColor: 'transparent', marginRight: 1 }}>
                    <EventIcon />
                  </Avatar>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Description"
              variant="outlined"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              required
              multiline
              rows={4}
              InputProps={{
                startAdornment: (
                  <Avatar sx={{ backgroundColor: 'transparent', marginRight: 1 }}>
                    <DescriptionIcon />
                  </Avatar>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Date"
              type="date"
              variant="outlined"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <Avatar sx={{ backgroundColor: 'transparent', marginRight: 1 }}>
                    <EventIcon />
                  </Avatar>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
              InputProps={{
                startAdornment: (
                  <Avatar sx={{ backgroundColor: 'transparent', marginRight: 1 }}>
                    <LocationOnIcon />
                  </Avatar>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Max Attendees"
              type="number"
              variant="outlined"
              name="maxAttendees"
              value={eventData.maxAttendees}
              onChange={handleChange}
              placeholder="Enter max attendees"
              required
              InputProps={{
                startAdornment: (
                  <Avatar sx={{ backgroundColor: 'transparent', marginRight: 1 }}>
                    <PeopleIcon />
                  </Avatar>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ marginBottom: 2 }}
              startIcon={<ImageIcon />}
            >
              Upload Event Image
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                hidden
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ padding: 2 , color:"white", backgroundColor:"black" }}
            >
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
  );
};

export default CreateEvent;
