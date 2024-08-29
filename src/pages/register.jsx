import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import registerImage from '../img/769197.jpg';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { registerAPi } from '../services/allAPI';

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(userData);
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      Swal.fire({
        title: "Please fill the form completely!",
        icon: "error"
      });
    } else {
      try {
        const result = await registerAPi(userData);
        console.log(result);
        if (result.status === 200) {
          Swal.fire({
            title: "User Registered Successfully!",
            icon: "success"
          });
          setUserData({
            username: "",
            email: "",
            password: ""
          });
          navigate('/login');
        }
      } catch (error) {
        Swal.fire({
          title: error.response.data,
          icon: "error"
        });
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            height: '100%',
            width: '100%',
          }}
        >
          {/* Left Side - Register Form */}
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: { xs: '16px', md: '24px' },
              order: { xs: 2, md: 1 }, // Place form below image on mobile
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '400px',
                padding: { xs: '16px', md: '24px' },
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'white',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Avatar sx={{ m: '0 auto 16px auto', bgcolor: 'black' }}>
                <FontAwesomeIcon icon={faPaw} />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ fontFamily: 'tim', fontWeight: 'bold', color: 'black' }}>
                Sign up for PeTsIfY
              </Typography>
              <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="name"
                  autoFocus
                  InputLabelProps={{
                    style: { color: 'black', fontWeight: 'bold' },
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputLabelProps={{
                    style: { color: 'black', fontWeight: 'bold' },
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  InputLabelProps={{
                    style: { color: 'black', fontWeight: 'bold' },
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: 'rgb(75, 28, 129)', color: 'white' }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
                      {"Already have an account? "}
                      <RouterLink to="/login" style={{ textDecoration: 'none', color: '#0A9BE0' }}>
                        {'Sign in'}
                      </RouterLink>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* Copyright */}
            <Typography variant="body2" color="text.secondary" paddingTop={5} align="center" sx={{ mt: 2 }}>
              {'Copyright © PeTsIfY. Built with React. '}
            </Typography>
          </Box>

          {/* Right Side - Image */}
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              backgroundImage: `url(${registerImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              height: { xs: '50vh', md: '100%' }, // Adjust height for mobile
              order: { xs: 1, md: 2 }, // Place image above form on mobile
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
                zIndex: 1,
              }}
              aria-label="close"
              onClick={() => navigate('/')} // Optional: Add functionality to close or navigate back
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
