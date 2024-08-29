import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import headerimage from '../img/petsify.jpg.jpg';
import headerimage2 from '../img/769150.jpg';
import Footer from "../components/footer";
import FAQ from "../components/faq.jsx";
import Swal from 'sweetalert2';

import { Link, useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem('token'));
  }, []);

  useEffect(() => {
    if (location.state?.fromLogin) {
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
      }
    });
  };

  const handleAdoptClick = () => {
    if (isLoggedIn) {
      navigate('/main');
    } else {
      navigate('/login', { state: { from: 'home' } });
    }
  };

  return (
    <>
      {/* Navbar */}
      <AppBar 
        position="static" 
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '100%',
          margin: '0 auto',
          padding: { xs: '5px 10px', sm: '10px 20px' }
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
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.9rem' }
              }}
            >
              PeTsiFy
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                color: '#000000',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
                margin: { xs: '0 6px', sm: '0 10px', md: '0 15px' }
              }}
            >
              Home
            </Button>
            {!isLoggedIn ? (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  color: '#000000',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
                  margin: { xs: '0 6px', sm: '0 10px', md: '0 15px' }
                }}
              >
                Login
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  color: '#000000',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
                  margin: { xs: '0 6px', sm: '0 10px', md: '0 15px' }
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Banner Section */}
      <Box
        sx={{
          maxWidth: '100%',
          margin: '0 auto',
          position: 'relative',
          height: { xs: '210px', sm: '400px', md: '650px' },
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
            fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography
  variant="h2"
  sx={{
    color: 'white',
    fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
    fontFamily: "'Merriweather', serif",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    letterSpacing: '0.1em',
    lineHeight: 1.2,
    margin: { xs: '10px 0', sm: '15px 0', md: '20px 0' },
  }}
>
  Welcome To PeTsiFy
</Typography>

          <Typography variant="h6" sx={{ margin: 0, fontSize: { xs: '0.9rem', sm: '1.2rem', md: '1.5rem' }, fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
            Your one-stop destination for pet adoption and care
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0A2540',
              color: '#ffffff',
              padding: { xs: '8px 16px', sm: '10px 20px', md: '15px 30px' },
              fontSize: { xs: '12px', sm: '14px', md: '18px' },
              marginTop: '20px',
              borderRadius: '5px',
              fontFamily: 'serif',
              fontWeight: 600,
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#0A2541',
              },
            }}
            onClick={handleAdoptClick}
          >
            ADOPT HERE
          </Button>
        </Box>
      </Box>

      {/* Content Section */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: { xs: '100%', lg: '1460px' },
          margin: '30px auto',
          padding: { xs: '10px', md: '20px' },
        }}
      >
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            marginBottom: { xs: '20px', md: '0' },
          }}
        >
          <img
            src={headerimage2}
            alt="Pet2"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            marginLeft: { md: '30px' },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
              marginBottom: '10px',
              color: '#333333',
            }}
          >
            Why Choose Us?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
              fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
              marginBottom: '10px',
              color: '#555555',
            }}
          >
            At PeTsiFy, we connect loving homes with the perfect pets. Our mission is to make pet adoption accessible, transparent, and joyful. With our wide range of services, including detailed pet profiles and adoption support, we ensure that you find your ideal companion.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0A2540',
              color: '#ffffff',
              padding: { xs: '8px 16px', sm: '10px 20px', md: '15px 30px' },
              fontSize: { xs: '12px', sm: '14px', md: '18px' },
              borderRadius: '5px',
              fontFamily: 'serif',
              fontWeight: 600,
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#0A2541',
              },
            }}
            onClick={handleAdoptClick}
          >
            Learn More
          </Button>
        </Box>
      </Container>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;







