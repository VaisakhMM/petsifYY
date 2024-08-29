import * as React from 'react';
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
import loginImage from '../img/435141.jpg';
import { useNavigate, Link } from 'react-router-dom';
import { loginAPi } from '../services/allAPI';
import Swal from 'sweetalert2';
import { useState } from 'react';

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      Swal.fire({
        title: "Please fill the form completely!",
        icon: "error"
      });
    } else {
      const result = await loginAPi(userData);
      if (result.status === 200) {
        sessionStorage.setItem("existinguser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
        Swal.fire({
          title: "User logged in successfully!",
          icon: "success"
        });
        setUserData({
          email: "",
          password: ""
        });
        navigate('/main');
      } else {
        Swal.fire({
          title: (result.response.data),
          icon: "error"
        });
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: '100%',
          width: '100%',
        }}>
          {/* Left Side - Image */}
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              height: { xs: '40%', md: '100%' },
              backgroundImage: `url(${loginImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                color: 'white',
                zIndex: 1,
              }}
              aria-label="close"
              onClick={() => navigate('/')} 
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Right Side - Login Form */}
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '400px',
                padding: '16px',
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'white',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <Avatar sx={{ m: '0 auto 16px auto', bgcolor: 'black' }}>
                <FontAwesomeIcon icon={faPaw} />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ fontFamily: 'tim', fontWeight: 'bold', color: 'black' }}>
                Sign in to PeTsIfY
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
                      {"Don't have an account? "}
                      <Link to="/register" style={{ textDecoration: 'none', color: '#0A9BE0' }}>
                        {'Sign up'}
                      </Link>
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
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
