import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { HiCalendar, HiUserGroup, HiBadgeCheck } from "react-icons/hi"; 

const BASE_URL = "https://event-management-aq3j.onrender.com"; 

const EventCard = ({
  id,
  title,
  date,
  location,
  imageUrl,
  attendeesCount,
  isFree,
}) => {
  const navigate = useNavigate();
  const fullImageUrl = `${BASE_URL}${imageUrl}`;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleViewDetails = () => {
    if (id) {
      navigate(`/event/${id}`);
    } else {
      console.error(
        "Event ID is undefined. Check if the ID is passed correctly."
      );
    }
  };

  return (
    // <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-4">
    //   {imageUrl && (
    //     <img
    //       src={fullImageUrl}
    //       alt={title}
    //       className="w-full h-40 object-cover rounded-t-lg mb-4"
    //     />
    //   )}
    //   <div className="p-2">
    //     <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">
    //       {title}
    //     </h2>

    //     <div className="flex items-center text-gray-600 text-sm mb-4">
    //       <HiCalendar className="mr-2 text-gray-500" />
    //       <p>
    //         {formattedDate} - {location}
    //       </p>
    //     </div>

    //     <div className="flex justify-between items-center text-gray-600 text-sm">
    //       <div className="flex items-center">
    //         <HiUserGroup className="mr-1" />
    //         <p>{attendeesCount} going</p>
    //       </div>
    //       <div className="flex items-center">
    //         {isFree ? (
    //           <HiBadgeCheck className="text-green-500 mr-1" />
    //         ) : (
    //           <HiBadgeCheck className="text-green-500 mr-1" />
    //         )}
    //         <p>{isFree ? "Free" : "Paid"}</p>
    //       </div>
    //     </div>

    //     <button
    //       className="w-full border border-gray-400 text-gray-600 py-2 mt-4 rounded-md hover:border-gray-500 hover:text-gray-800 transition-colors duration-300"
    //       onClick={handleViewDetails}
    //     >
    //       View Details
    //     </button>
    //   </div>
    // </div>
    <Card sx={{ borderRadius: '16px', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={fullImageUrl}
          alt={title}
          sx={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px', objectFit: 'cover' }}
        />
      )}
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1f2937' }}>
          {title}
        </Typography>
        <Box display="flex" alignItems="center" color="text.secondary" mb={1}>
          <HiCalendar className="w-5 h-5 text-gray-500" />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {formattedDate} - {location}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" color="text.secondary">
          <Box display="flex" alignItems="center">
            <HiUserGroup className="w-5 h-5 text-gray-500" />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {attendeesCount} going
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <HiBadgeCheck className={`w-5 h-5 mr-1 ${isFree ? 'text-green-500' : 'text-red-500'}`} />
            <Typography variant="body2">{isFree ? "Free" : "Paid"}</Typography>
          </Box>
        </Box>
      </CardContent>
      <Button
        variant="outlined"
        
        onClick={handleViewDetails}
        sx={{ width: '100%', borderRadius: '0 0 16px 16px', py: 1, mt: 1 , color:'white' , backgroundColor:"black" }}
      >
        View Details
      </Button>
    </Card>
  );
};

export default EventCard;
