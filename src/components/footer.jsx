import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import footerImage from '../img/WhatsApp Image 2024-08-08 at 16.16.31_9f003d0e.png';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
    const form = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));

    useEffect(() => {
        setIsLoggedIn(!!sessionStorage.getItem('token'));
    }, []);

    useEffect(() => {
        if (location.state?.fromLogin) {
            navigate('/main');
        }
    }, [location.state, navigate]);

    const handleAdoptionClick = () => {
        if (isLoggedIn) {
            navigate('/adoption');
        } else {
            navigate('/login', { state: { from: 'home' } });
        }
    };

    const handleMainClick = () => {
        if (isLoggedIn) {
            navigate('/main');
        } else {
            navigate('/login', { state: { from: 'home' } });
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();

        const userName = form.current.user_name.value;
        const userEmail = form.current.user_email.value;
        const message = form.current.message.value;

        if (!userName || !userEmail || !message) {
            Swal.fire({
                icon: 'error',
                title: 'All fields are required!',
                text: 'Please fill in your Name, Email, and Message before sending.',
                showConfirmButton: true,
            });
            return;
        }

        emailjs.sendForm('service_ivoa8er', 'template_2nfj9vw', form.current, 'k__ezzA0ux57PGRaC')
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Email Sent Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                form.current.reset();
            }, (error) => {
                console.log('FAILED...', error.text);
            });
    };

    return (
        <Box
            sx={{
                backgroundColor: '#0A2540',
                color: '#F5F5F5',
                padding: { xs: '20px', sm: '40px' },
                fontFamily: 'Arial, sans-serif'
            }}
        >
            <Grid container spacing={4} sx={{ flexDirection: { xs: 'column', sm: 'row' }, textAlign: { xs: 'center', sm: 'left' } }}>
                {/* About Us Section */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="h3" component="h3" sx={{ mb: 2, fontFamily: '-moz-initial', fontSize: '28px', fontWeight: 'bold', color: '#F5F5F5' }}>
                        About Us
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: '20px' }}>
                        <img src={footerImage} alt="About Us" style={{ width: '100%', maxWidth: '150px', height: 'auto', borderRadius: '8px' }} />
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, lineHeight: 1.6, textAlign: { xs: 'center', sm: 'left' } }}>
                            Are you looking to fill an empty space in your heart with unconditional love? Consider adopting a furry, feathered, or scaly friend. Every pet deserves a loving home, and you deserve the joy of companionship. By choosing to adopt, you're not just bringing a pet into your home, but you're offering a lifeline to a furry friend in need. Your decision to open your heart can transform a lonely life into a beautiful story of love and redemption. Browse our website for available furry babies to find your perfect match today...
                        </Typography>
                    </Box>
                </Grid>

                {/* Contact Us Section */}
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
                    <Box sx={{ maxWidth: '600px', width: '100%' }}>
                        <Typography variant="h3" component="h2" sx={{ mb: 2, fontFamily: '-moz-initial', fontSize: '28px', fontWeight: 'bold', color: '#F5F5F5', textAlign: 'center' }}>
                            Contact Us
                        </Typography>
                        <Box component="form" ref={form} onSubmit={sendEmail} noValidate autoComplete="off">
                            <TextField
                                placeholder="Name"
                                name="user_name"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2, backgroundColor: '#fff' }}
                            />
                            <TextField
                                placeholder="Your email address"
                                name="user_email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2, backgroundColor: '#fff' }}
                            />
                            <TextField
                                placeholder="Enter Your message"
                                name="message"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2, backgroundColor: '#fff' }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, backgroundColor: '#FF7A12', color: '#fff', '&:hover': { backgroundColor: '#e55b4b' } }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Footer Bottom */}
            <Box
                sx={{
                    paddingTop: '20px',
                    textAlign: 'center',
                    mt: '20px'
                }}
            >
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '1rem' }, color: '#F5F5F5' }}>
                        <a href="#home" style={{ textDecoration: 'none', color: '#F5F5F5', margin: '0 10px' }}>Home</a>
                        <span onClick={handleMainClick} style={{ textDecoration: 'none', color: '#F5F5F5', margin: '0 10px', cursor: 'pointer' }}>Main</span>
                        <span onClick={handleAdoptionClick} style={{ textDecoration: 'none', color: '#F5F5F5', margin: '0 10px', cursor: 'pointer' }}>Adoption</span>
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 2, fontSize: { xs: '.7rem', sm: '1rem' }, color: '#F5F5F5' }}>
                    &copy; 2024 PeTsIfY. Built with React. | Designed by Vaisakh M M
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '30px', color: '#F5F5F5' }} />
                    <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '30px', color: '#F5F5F5' }} />
                    <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '30px', color: '#F5F5F5' }} />
                    <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '30px', color: '#F5F5F5' }} />
                </Box>
            </Box>
        </Box>
    );
}
