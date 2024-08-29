import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faBars, faTimes, faDonate, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import headerimage from '../img/banner2.jpg';
import { CartContext } from './cartcontent';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems } = useContext(CartContext);
  const [donateOpen, setDonateOpen] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("existinguser")) {
      const existingUserData = JSON.parse(sessionStorage.getItem("existinguser"));
      const capitalizedUserName = existingUserData.username.charAt(0).toUpperCase() + existingUserData.username.slice(1);
      setUserName(capitalizedUserName);
    }
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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

  const handleDonateToggle = () => setDonateOpen(!donateOpen);

  const drawer = (
    <Box sx={{ textAlign: 'center', padding: '20px', width: '240px' }}>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        <FontAwesomeIcon icon={faTimes} style={{ color: '#000000', fontSize: '1.5rem' }} />
      </IconButton>
      <Typography
        variant="h6"
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
        {['Home', 'Main', 'Adoption', 'Cart'].map((text) => (
          <ListItem button key={text} component={Link} to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleDonateToggle}>
          <FontAwesomeIcon icon={faDonate} style={{ color: 'white', marginRight: '10px' }} />
          <ListItemText primary="Donate" />
          <FontAwesomeIcon icon={donateOpen ? faChevronUp : faChevronDown} style={{ marginLeft: '10px' }} />
        </ListItem>
        <Collapse in={donateOpen}>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/donate">
              <ListItemText primary="Donation Form" sx={{ pl: 4 }} />
            </ListItem>
            <ListItem button component={Link} to="/donationlist">
              <ListItemText primary="Donation List" sx={{ pl: 4 }} />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={isLoggedIn ? handleLogout : () => navigate('/login')}>
          <ListItemText primary={isLoggedIn ? 'Logout' : 'Login'} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
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
            <Button color="inherit" component={Link} to="/" sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/main" sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}>
              Main
            </Button>
            <Button color="inherit" component={Link} to="/adoption" sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}>
              Adoption
            </Button>
            <Box sx={{ position: 'relative' }}>
              <Button color="inherit" onClick={handleDonateToggle} sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}>
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
                    width: '200px',
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
            <Button color="inherit" component={Link} to="/cart" sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px', position: 'relative' }}>
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
            {isLoggedIn ? (
              <Button color="inherit" onClick={handleLogout} sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login" sx={{ color: '#000000', fontSize: '1rem', margin: '0 15px' }}>
                Login
              </Button>
            )}
          </Box>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
            <FontAwesomeIcon icon={faBars} style={{ color: '#000000', fontSize: '1.5rem' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        sx={{
          maxWidth: { xs: '100%', lg: '1518px' },
          margin: '0 auto',
          position: 'relative',
          height: { xs: '200px', md: '650px' },
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img src={headerimage} alt="Pet" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        <Box
          sx={{
            position: 'absolute',
            textAlign: 'center',
            color: 'white',
            fontSize: { xs: '1.5rem', md: '2rem' },
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 'bold', fontFamily: 'Times New Roman', fontSize: { xs: '2rem', md: '4rem' }, mb: 2 }}>
            Welcome {userName}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
            Find your perfect companion today
          </Typography>
        </Box>
      </Box>
    </>
  );
}




