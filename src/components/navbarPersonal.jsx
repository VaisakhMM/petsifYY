import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faBars, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from './cartcontent'; // Import the CartContext

export default function NavbarPersonal() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false); // State to control submenu
  const { cartItems } = useContext(CartContext); // Access the cart context
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to logout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
        Swal.fire("Logged out!", "", "success");
        navigate('/');
      }
    });
  };

  const handleDonateToggle = () => {
    setDonateOpen(!donateOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        <FontAwesomeIcon icon={faTimes} style={{ color: '#000000', fontSize: '1.5rem' }} />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: '#000000',
          fontFamily: "'Times New Roman', Times, serif",
          fontWeight: 'bold',
          padding: '20px 0',
        }}
      >
        PeTsiFy
      </Typography>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/main">
          <ListItemText primary="Main" />
        </ListItem>
        <ListItem button component={Link} to="/adoption">
          <ListItemText primary="Adoption" />
        </ListItem>

        {/* Donate with Submenus */}
        <ListItem button onClick={handleDonateToggle}>
          <ListItemText primary="Donate" />
          <FontAwesomeIcon icon={donateOpen ? faChevronUp : faChevronDown} style={{ marginLeft: '10px' }} />
        </ListItem>
        <Collapse in={donateOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/donate" sx={{ pl: 4 }}>
              <ListItemText primary="Donation Form" />
            </ListItem>
            <ListItem button component={Link} to="/donationlist" sx={{ pl: 4 }}>
              <ListItemText primary="Donation List" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button component={Link} to="/cart">
          <ListItemText primary="Cart" />
          {cartItems.length > 0 && (
            <Box
              component="span"
              sx={{
                position: 'absolute',
                top: -5,
                right: -10,
                backgroundColor: '#ff6347',
                borderRadius: '50%',
                padding: '2px 6px',
                color: 'white',
                fontSize: '0.8rem',
              }}
            >
              {cartItems.length}
            </Box>
          )}
        </ListItem>

        <ListItem button onClick={isLoggedIn ? handleLogout : () => navigate('/login')}>
          <ListItemText primary={isLoggedIn ? 'Logout' : 'Login'} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: { xs: '100%', lg: '1578px' },
          margin: '0 auto',
          padding: { xs: '5px 10px', sm: '10px 0px' }
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faPaw} style={{ color: '#000000', fontSize: '1.5rem', marginRight: '10px' }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: '#000000',
                fontFamily: "'Times New Roman', Times, serif",
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', md: '1.9rem' }
              }}
            >
              PeTsiFy
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/main"
              sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}
            >
              Main
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/adoption"
              sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}
            >
              Adoption
            </Button>
            <Box sx={{ position: 'relative' }}>
              <Button
                color="inherit"
                onClick={handleDonateToggle}
                sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}
              >
                Donate
                <FontAwesomeIcon icon={donateOpen ? faChevronUp : faChevronDown} style={{ marginLeft: '10px' }} />
              </Button>
              {donateOpen && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    zIndex: 1,
                    width: '200px', // Adjust width as needed
                    border: '1px solid #ddd'
                  }}
                >
                  <Button
                    color="inherit"
                    component={Link}
                    to="/donate"
                    sx={{
                      color: '#000000',
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 20px',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #f1f1f1',
                      '&:last-child': {
                        borderBottom: 'none',
                      },
                      '&:hover': {
                        backgroundColor: '#f1f1f1',
                      },
                    }}
                  >
                    Donation Form
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/donationlist"
                    sx={{
                      color: '#000000',
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 20px',
                      fontSize: '0.9rem',
                      '&:hover': {
                        backgroundColor: '#f1f1f1',
                      },
                    }}
                  >
                    Donation List
                  </Button>
                </Box>
              )}
            </Box>
            <Button
              color="inherit"
              component={Link}
              to="/cart"
              sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px', position: 'relative' }}
            >
              Cart
              {cartItems.length > 0 && (
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    top: -5,
                    right: -10,
                    backgroundColor: '#ff6347',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    color: 'white',
                    fontSize: '0.8rem',
                  }}
                >
                  {cartItems.length}
                </Box>
              )}
            </Button>
            <Button
              color="inherit"
              onClick={isLoggedIn ? handleLogout : () => navigate('/login')}
              sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </Box>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <FontAwesomeIcon icon={faBars} style={{ color: '#000000', fontSize: '1.5rem' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}


