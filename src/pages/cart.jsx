import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../components/cartcontent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faBars } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {
    AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer,
    List, ListItem, ListItemText, Container, Paper, Grid, Card,
    CardContent, CardMedia
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from '../components/footer';
import { Phone } from "@mui/icons-material";
import { BASE_URL } from '../services/baseURL';
import NavbarPersonal from '../components/navbarPersonal';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by verifying if a token exists in localStorage
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Convert to boolean
    }, []);

    const handleCheckout = () => {
        navigate('/personalinfo', { state: { cartItems } });
    };
    
    

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAdoptNow = () => {
        navigate('/adoption');
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4B1C81',
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

    const drawer = (
        <Box sx={{ width: 240, textAlign: 'center', position: 'relative' }}>
            <IconButton
                onClick={handleDrawerToggle}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color: '#000000'
                }}
            >
                <AiFillCloseCircle size={30} />
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
                {[ 'Home','Main', 'Adoption', 'Donate', 'Cart', isLoggedIn ? 'Logout' : 'Login'].map((text) => (
                    <ListItem
                        button
                        key={text}
                        component={Link}
                        to={text === 'Main' ? '/main' : text === 'Home' ? '/' : `/${text.toLowerCase()}`}
                        onClick={text === 'Logout' ? handleLogout : null}
                    >
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <NavbarPersonal/>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, width: '100%' }}>
                    <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>Your Pets Cart</Typography>
                    {cartItems.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Your Cart Is Empty. Please Select A Pet.
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleAdoptNow}
                                sx={{ fontSize: '1.1rem', padding: '12px 24px' }} 
                            >
                                Adopt a Pet Now
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Grid container spacing={3}>
                                {cartItems.map((item, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Card elevation={3} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', width: '100%', mb: 2 }}>
                                            <CardMedia
                                                component="img"
                                                image={`${BASE_URL}/uploads/${item.image}`}
                                                alt={item.petname}
                                                sx={{ width: { xs: '100%', md: '50%' }, height: { xs: 200, md: 300 }, borderRadius: 2, boxShadow: 0, padding: '20px' }} 
                                            />
                                            <CardContent 
                                                sx={{ 
                                                    textAlign: 'left', 
                                                    width: { xs: '100%', md: '50%' },
                                                    p: { xs: 2, md: 3 },
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography variant="h6" sx={{ textTransform: 'uppercase', fontWeight: 'bold', mb: 1 }}>
                                                    {item.petname}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 1 }}>Age: {item.age}</Typography>
                                                <Typography variant="body2" sx={{ mb: 1 }}>Breed: {item.breed}</Typography>
                                                <Typography variant="body2" sx={{ mb: 1 }}>Gender: {item.gender}</Typography>
                                                <Typography variant="body2" sx={{ mb: 1 }}>Vaccinated: {item.vaccinated}</Typography>
                                                <Typography variant="body2" sx={{ mb: 1 }}>Spayed/Neutered: {item.spayed}</Typography>
                                                <Typography variant="body2" sx={{ mb: 1 }}>Additional Info: {item.additionalInfo}</Typography>
                                                <Typography variant="body2" sx={{ mb: 1 }}>Owner: {item.username}</Typography>
                                                <Typography variant="body2" sx={{ mb: 1 }}>Place: {item.address}</Typography>
                                                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Phone sx={{ mr: 1, fontSize: '1rem' }} />
                                                    Mobile Number: {item.phone}
                                                </Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
  Price: {item.price}
</Typography>

                                                <Box 
                                                    sx={{ 
                                                        display: 'flex', 
                                                        justifyContent: 'space-between', 
                                                        alignItems: 'center', 
                                                        mt: 3 
                                                    }}
                                                >
                                                  <Button 
    variant="contained" 
    color="primary" 
    onClick={() => removeFromCart(item._id)} // Pass item.id instead of index
    sx={{ 
        fontSize: '1rem', 
        padding: '8px 16px',
        backgroundColor: '#4B1C81', 
        '&:hover': { 
            backgroundColor: '#3a1466' 
        }
    }}
>
    Remove from Cart
</Button>


                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button 
    variant="contained" 
    color="primary" 
    onClick={handleCheckout} // Add this line to handle the checkout
    sx={{ 
        fontSize: '1.2rem', 
        padding: '12px 24px',
        backgroundColor: '#4B1C81', 
        '&:hover': { 
            backgroundColor: '#3a1466' 
        } 
    }}
>
    Checkout
</Button>

                            </Box>
                        </>
                    )}
                </Paper>
            </Container>

            <Footer />
        </>
    );
};

export default Cart;




