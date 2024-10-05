import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
  faCaretDown,
  faPlus,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, colors } from '@mui/material';

const Header = () => {
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logout } = useContext(AuthContext); // Get user from AuthContext
  console.log(user);
  
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to homepage after logging out
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    // <header className="bg-white shadow py-4">
    //   <div className="container mx-auto flex justify-between items-center">
    //     {/* Logo */}
    //     <Link
    //       to="/"
    //       className="text-2xl font-bold text-[#dc363c] flex items-center space-x-2"
    //     >
    //       <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
    //       <span>BookMyEvents</span>
    //     </Link>

    //     {/* Search Bar */}
    //     <div className="flex-1 mx-4 relative">
    //       {/* <input
    //         type="text"
    //         placeholder="Search events..."
    //         className="px-4 py-2 ps-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
    //       />
    //       <FontAwesomeIcon
    //         icon={faSearch}
    //         className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
    //       /> */}
    //     </div>

    //     {/* Buttons */}
    //     <div className="flex space-x-4 items-center relative">
    //       {user ? (
    //         <>
    //           <span className="text-gray-700 font-semibold">
    //             Welcome, {user.username}
    //           </span>

    //           {/* Dropdown Toggle Button */}
    //           <div className="relative">
    //             <button
    //               onClick={toggleDropdown}
    //               className="bg-[#093054] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#102144] flex items-center"
    //             >
    //               Actions
    //               <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
    //             </button>

    //             {/* Dropdown Menu */}
    //             {dropdownOpen && (
    //               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
    //                 <Link
    //                   to="/create-event"
    //                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
    //                   onClick={() => setDropdownOpen(false)}
    //                 >
    //                   <FontAwesomeIcon icon={faPlus} className="mr-2" />
    //                   Create Event
    //                 </Link>
    //                 <Link
    //                   to="/my-events"
    //                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
    //                   onClick={() => setDropdownOpen(false)}
    //                 >
    //                   <FontAwesomeIcon icon={faListAlt} className="mr-2" />
    //                   My Events
    //                 </Link>
    //               </div>
    //             )}
    //           </div>

    //           {/* Logout Button */}
    //           <button
    //             onClick={handleLogout}
    //             className="flex items-center bg-[#dc363c] text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600"
    //           >
    //             <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
    //             Logout
    //           </button>
    //         </>
    //       ) : (
    //         <>
    //           <Link
    //             to="/login"
    //             className="flex items-center bg-transparent text-gray-600 hover:text-red-600 border border-gray-300 px-4 py-2 rounded-md font-semibold"
    //           >
    //             <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
    //             Login
    //           </Link>
    //           <Link
    //             to="/register"
    //             className="flex items-center bg-[#dc363c] text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600"
    //           >
    //             <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
    //             Register
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </header>

    <AppBar position="static" sx={{ backgroundColor: 'black', boxShadow: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo and Welcome Message */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
              <FontAwesomeIcon size="lg" />
              <span style={{ marginLeft: '8px' }}>EventCrew</span>
            </Typography>
          </Link>

        </Box>

        {/* Right Side Box for Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user && (
            <Typography variant="body1" sx={{ marginLeft: 2, color:"white" }}>
              Welcome, {user.username}
            </Typography>
          )}
          {user ? (
            <>
              {/* Dropdown Toggle Button */}
              <IconButton onClick={handleMenuOpen}  sx={{ color: 'white' }}>
                <Typography variant="body1">Action</Typography> <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: '4px' }} />
              </IconButton>
              
              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    maxHeight: 200,
                    width: '20ch',
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/create-event">
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
                  Create Event
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/my-events">
                  <FontAwesomeIcon icon={faListAlt} style={{ marginRight: '8px' }} />
                  My Events
                </MenuItem>
              </Menu>

              {/* Logout Button */}
              <Button
                variant="contained"
                color="black"
                onClick={handleLogout}
                startIcon={<FontAwesomeIcon icon={faSignOutAlt} />}
                sx={{ marginLeft: 2 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="inherit"
                startIcon={<FontAwesomeIcon icon={faSignInAlt} />}
                sx={{ marginRight: 1 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{ backgroundColor: '#dc363c', '&:hover': { backgroundColor: '#dc143c' } }}
                startIcon={<FontAwesomeIcon icon={faUserCircle} />}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
  </AppBar>
  );
};

export default Header;
