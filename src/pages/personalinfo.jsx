import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../components/cartcontent';
import Swal from 'sweetalert2';
import {
    Typography, Button, Box, Container, Paper, Grid, Card,
    CardContent, CardMedia, TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/baseURL';
import NavbarPersonal from '../components/navbarPersonal';
import { addDeliveryAPi } from '../services/allAPI';

const PersonalInfo = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [token, setToken] = useState("");
   const [contactDetails, setContactDetails] = useState({
        fullname: "",
        phonenumber: "",
        email: "",
        street: "",
        city: "",
        state: "",
        postal: "",
        country: ""        
    });

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [cartItems]);

    const handleRemove = (itemId) => {
        console.log('Removing item with ID:', itemId); // Debugging log
        removeFromCart(itemId);
        Swal.fire({
            icon: 'success',
            title: 'Removed!',
            text: 'The item has been removed from your cart.',
            showConfirmButton: false,
            timer: 1500
        });
    };
    
    
    

    const handlePayment = async (e) => {
        e.preventDefault();
        const { fullname, phonenumber, email, street, city, state, postal, country } = contactDetails;

        if (!fullname || !phonenumber || !email || !street || !city || !state || !postal || !country) {
            Swal.fire({
                title: "Please fill the form completely!",
                icon: "error"
            });
            return;
        }

        const reqBody = new FormData();
        reqBody.append('fullname', fullname);
        reqBody.append('phonenumber', phonenumber);
        reqBody.append('email', email);
        reqBody.append('street', street);
        reqBody.append('city', city);
        reqBody.append('state', state);
        reqBody.append('postal', postal);
        reqBody.append('country', country);

        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const result = await addDeliveryAPi(reqBody, reqHeader);
        if (result.status === 200) {
            handleRazorpayPayment();

        } else {
            Swal.fire({
                title: (result.response.data),
                icon: "error"
            });
        }
    };

    const handleRazorpayPayment = () => {
        const options = {
            key: "rzp_test_yVJj9neqAE1WTf",
            amount: totalPrice * 100,
            currency: "INR",
            name: "PeTsIfY",
            description: "Make Payment",
            image: "https://png.pngtree.com/png-vector/20191201/ourmid/pngtree-dog-logo-vector-design-png-image_2066898.jpg",
            handler: function (response) {
                Swal.fire({
                    title: "Payment Successful!",
                    icon: "success"
                });
                navigate('/adoption');
            },
            prefill: {
                name: contactDetails.fullname,
                email: contactDetails.email,
                contact: contactDetails.phonenumber
            },
            theme: {
                color: "#3399cc"
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };




    useEffect(() => {
        setToken(sessionStorage.getItem("token"));
      }, []);

    return (
        <>
            <NavbarPersonal />
            <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
                <Grid container spacing={4} direction={{ xs: 'column', md: 'row' }}>
                    <Grid item xs={12} md={7}>
                        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
                                Delivery Address
                            </Typography>
                            <form noValidate autoComplete="off" style={{ maxWidth: '600px', margin: 'auto' }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Personal Information
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Full Name"
                                            name="fullname"
                                            placeholder="Enter your full name"
                                            required
                                            value={contactDetails.fullname}
                                            onChange={(e) => setContactDetails({ ...contactDetails, fullname: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Phone Number"
                                            name="phonenumber"
                                            placeholder="Enter your phone number"
                                            required
                                            value={contactDetails.phonenumber}
                                            onChange={(e) => setContactDetails({ ...contactDetails, phonenumber: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Email Address"
                                            name="email"
                                            placeholder="Enter your email address"
                                            required
                                            value={contactDetails.email}
                                            onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                                <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
                                    Address
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Street Address"
                                            name="street"
                                            placeholder="Enter your street address"
                                            required
                                            value={contactDetails.street}
                                            onChange={(e) => setContactDetails({ ...contactDetails, street: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="City"
                                            name="city"
                                            placeholder="Enter your city"
                                            required
                                            value={contactDetails.city}
                                            onChange={(e) => setContactDetails({ ...contactDetails, city: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="State"
                                            name="state"
                                            placeholder="Enter your state"
                                            required
                                            value={contactDetails.state}
                                            onChange={(e) => setContactDetails({ ...contactDetails, state: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Postal Code"
                                            name="postal"
                                            placeholder="Enter your postal code"
                                            required
                                            value={contactDetails.postal}
                                            onChange={(e) => setContactDetails({ ...contactDetails, postal: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Country"
                                            name="country"
                                            placeholder="Enter your country"
                                            required
                                            value={contactDetails.country}
                                            onChange={(e) => setContactDetails({ ...contactDetails, country: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item xs={12} md={5}>
                        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
                                Order Summary
                            </Typography>
                            {cartItems.length === 0 ? (
                                <Typography variant="h6" align="center">
                                    Your cart is empty
                                </Typography>
                            ) : (
                                <Box>
                                    {cartItems.map((item) => (
                                        <Card key={item.id} sx={{ display: 'flex', mb: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100, height: 100, objectFit: 'cover' }}
                                                image={`${BASE_URL}/uploads/${item.image}`}
                                                alt={item.name}
                                            />
                                            <CardContent sx={{ flex: 1 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Age: {item.age}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Gender: {item.gender}
                                                </Typography>
                                                <Typography variant="h6" sx={{ mt: 1 }}>
                                                    ₹{item.price}
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={() => handleRemove(item._id)}
                                                >
                                                    Remove
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    <Box sx={{ textAlign: 'right', mt: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            Total: ₹{totalPrice}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Paper>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePayment}
                                disabled={cartItems.length === 0}
                            >
                                Make Payment
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default PersonalInfo;
