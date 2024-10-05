import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from "react-icons/hi"; 
import api from "../api/api"; 
import { Container, Paper, Typography, Button, Grid, Box } from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';

const EventDetails = () => {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState(null); 
  const [userHasRSVPd, setUserHasRSVPd] = useState(false); 

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
        setUserHasRSVPd(response.data.attendees.includes("your_user_id")); 
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Error fetching event details");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  // RSVP to the event
  const handleRSVP = async () => {
    try {
      const response = await api.post(`/events/${id}/rsvp`);
      setEvent(response.data.event); // Update the event with the new RSVP
      setUserHasRSVPd(true); // Mark that the user has RSVPed
      setRsvpStatus("Event Enrolled Successfully...!"); // Show success message
    } catch (error) {
      console.error("RSVP failed:", error.response?.data || error.message);
      setRsvpStatus(
        error.response?.data?.message || "Error RSVPing to the event."
      );
    }
  };

  console.log(event);
  

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!event) {
    return <p>No event details found.</p>;
  }

  const formattedDate = new Date(event.date).toLocaleDateString();
  const formattedTime = new Date(event.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    // <div className="container mx-auto py-8">
    //   <div className="flex flex-col lg:flex-row gap-8">
    //     {/* Event Image */}
    //     {event.imageUrl && (
    //       <div className="lg:w-1/2">
    //         <img
    //           src={`http://localhost:4000${event?.imageUrl}`}
    //           alt={event.title}
    //           className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
    //         />
    //       </div>
    //     )}

    //     {/* Event Info */}
    //     <div className="lg:w-1/2">
    //       <div className="mb-6">
    //         <h2 className="text-4xl font-bold text-gray-900 mb-4">
    //           {event.title}
    //         </h2>
    //         <div className="flex items-center gap-4 text-gray-500">
    //           <HiOutlineCalendar className="w-6 h-6 text-gray-700" />
    //           <span>{formattedDate}</span>
    //           <HiOutlineClock className="w-6 h-6 text-gray-700" />
    //           <span>{formattedTime}</span>
    //         </div>
    //       </div>

    //       {/* Location */}
    //       <div className="mb-6">
    //         <div className="flex items-center text-gray-500 gap-4">
    //           <HiOutlineLocationMarker className="w-6 h-6 text-gray-700" />
    //           <span>{event.location}</span>
    //         </div>
    //       </div>

    //       {/* Description */}
    //       <div className="mb-6">
    //         <h3 className="text-xl font-semibold text-gray-800 mb-2">
    //           About this event
    //         </h3>
    //         <p className="text-gray-600">{event.description}</p>
    //       </div>

    //       {/* RSVP Button */}
    //       <div>
    //         {!userHasRSVPd && event.attendees.length < event.maxAttendees ? (
    //           <button
    //             className="border border-gray-400 text-orange-500 font-bold px-6 py-3 rounded-md hover:bg-orange-500 hover:text-white  w-full lg:w-auto"
    //             onClick={handleRSVP}
    //           >
    //             Reserve a spot
    //           </button>
    //         ) : (
    //           <p className="text-gray-500">
    //             {userHasRSVPd
    //               ? "You have already booked this event."
    //               : "This event is fully booked."}
    //           </p>
    //         )}

    //         {/* Show RSVP status message */}
    //         {rsvpStatus && <p className="text-green-500 mt-4">{rsvpStatus}</p>}
    //       </div>
    //     </div>
    //   </div>

    //   {/* Event Meta Info */}
    //   <div className="mt-8">
    //     <h3 className="text-xl font-semibold text-gray-800 mb-2">
    //       Event Details
    //     </h3>
    //     <div className="flex items-center gap-4 text-gray-600">
    //       <HiOutlineClock className="w-6 h-6 text-gray-700" />
    //       <p>
    //         {formattedTime} | {event.maxAttendees} total seats
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <Container maxWidth="lg" sx={{ py: 4 }}>
    <Grid container spacing={4}>
      {/* Event Image */}
      {event.imageUrl && (
        <Grid item xs={12} lg={6}>
          <ImageList cols={1}>
            <ImageListItem>
              <img
                src={`http://localhost:4000${event?.imageUrl}`}
                alt={event.title}
                style={{ borderRadius: '16px', height: '300px', objectFit: 'cover' }}
              />
            </ImageListItem>
          </ImageList>
        </Grid>
      )}

      {/* Event Info */}
      <Grid item xs={12} lg={6}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: '16px' }}>
          <Typography variant="h4" gutterBottom>
            {event.title}
          </Typography>
          <Box display="flex" alignItems="center" color="text.secondary" mb={2}>
            <HiOutlineCalendar className="w-6 h-6 text-gray-700" />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              {formattedDate}
            </Typography>
            <HiOutlineClock className="w-6 h-6 text-gray-700" />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              {formattedTime}
            </Typography>
          </Box>

          {/* Location */}
          <Box display="flex" alignItems="center" color="text.secondary" mb={2}>
            <HiOutlineLocationMarker className="w-6 h-6 text-gray-700" />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              {event.location}
            </Typography>
          </Box>

          {/* Description */}
          <Typography variant="h6" gutterBottom>
            About this event
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {event.description}
          </Typography>

          {/* RSVP Button */}
          {!userHasRSVPd && event.attendees.length < event.maxAttendees ? (
            <Button
              variant="contained"
             
              onClick={handleRSVP}
              sx={{ mt: 2 , color:'white' , backgroundColor:'black' }}
            >
              Reserve a spot
            </Button>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {userHasRSVPd
                ? "You have already booked this event."
                : "This event is fully booked."}
            </Typography>
          )}

          {/* Show RSVP status message */}
          {rsvpStatus && <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>{rsvpStatus}</Typography>}
        </Paper>
      </Grid>
    </Grid>

    {/* Event Meta Info */}
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Event Details
      </Typography>
      <Box display="flex" alignItems="center" color="text.secondary">
        <HiOutlineClock className="w-6 h-6 text-gray-700" />
        <Typography variant="body1" sx={{ marginLeft: 1 }}>
          {formattedTime} | {event.maxAttendees} total seats
        </Typography>
      </Box>
    </Box>
  </Container>
  );
};

export default EventDetails;
