import React from "react";
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import { AddShoppingCart, LocalShipping, AccessTime, Public } from '@mui/icons-material';
import featureImage1 from '../img/banner1 (2).jpg';
import featureImage2 from '../img/banner2.jpg';
import featureImage3 from '../img/banner3.jpg';
import serviceImage1 from '../img/banner1.jpg';
import serviceImage2 from '../img/banner1.jpg';
import serviceImage3 from '../img/banner1.jpg';
import whatIsPetsifyImage from '../img/banner4.jpg';

import FAQ from "../components/faq.jsx";
// Define hover effects for images and cards
const hoverEffect = {
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3 },
  },
};

// Define fade-in effect for scrolling into view
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Main = () => {
  return (
    <>
      <Navbar />

      {/* Featured Content Section */}
      <Container sx={{ py: 6, backgroundColor: '#fff' }}>
        {/* New Section: What is PeTsiFy? */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '500px' },
                  overflow: 'hidden',
                  borderRadius: '15px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <motion.img
                  src={whatIsPetsifyImage}
                  alt="What is PeTsiFy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    borderRadius: '15px',
                  }}
                  whileHover={hoverEffect.hover}
                />
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} display="flex" alignItems="center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box>
                <Typography variant="h4" sx={{ mb: 2,fontFamily:'serif', fontWeight: 'bold', color: '#333' }}>
                  What is PeTsiFy?
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                  PeTsiFy is a comprehensive platform dedicated to the welfare of pets and their owners.
                  We connect people with pets that need loving homes and provide services such as adoption, 
                  training, and veterinary care. Our goal is to make pet adoption and care easy, accessible, 
                  and trustworthy.
                </Typography>
                <Typography variant="h4" sx={{ mb: 2, fontFamily:'serif',fontWeight: 'bold', color: '#333' }}>
                  Our Goals
                </Typography>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  Our mission is to ensure every pet finds a loving home and receives the best care possible. 
                  We strive to create a community where pet owners can access all the services they need to 
                  give their pets a happy and healthy life.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Existing Feature Grid */}
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontFamily:'serif',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Features on PeTsiFy
        </Typography>
        <Grid container spacing={4}>
          {[{ img: featureImage1, title: 'Adopt a Pet', link: '/adoption' },
            { img: featureImage2, title: 'Donate', link: '/donate' },
            { img: featureImage3, title: 'Cart', link: '/cart' }].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Link to={feature.link} style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: '250px',
                      overflow: 'hidden',
                      borderRadius: '15px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <motion.img
                      src={feature.img}
                      alt={feature.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                        borderRadius: '15px',
                      }}
                      whileHover={hoverEffect.hover}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        textAlign: 'center',
                        padding: '10px',
                      }}
                    >
                      <Typography variant="h6">
                        {feature.title}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Services Section */}
      <Box sx={{ py: 6, backgroundColor: '#ffffff' }}>
        <Container>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontFamily:'serif',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Pets Needed Services
          </Typography>
          <Grid container spacing={4}>
            {[{ title: 'Pet Adoption', img: serviceImage1, description: 'Find your perfect furry friend from our selection of pets available for adoption.' },
              { title: 'Pet Training', img: serviceImage2, description: 'Professional training sessions to help your pet learn good behavior and obedience.' },
              { title: 'Veterinary Services', img: serviceImage3, description: 'Comprehensive veterinary care to keep your pet healthy and happy.' }].map((service, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card
                    sx={{
                      overflow: 'hidden',
                      borderRadius: '15px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                      },
                      backgroundColor: '#fff',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={service.img}
                      alt={service.title}
                    />
                    <CardContent>
                      <Typography variant="h5" sx={{ mb: 2 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body1">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Additional Services Section */}
      <Box sx={{ py: 6, backgroundColor: '#fffff' }}>
        <Container>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontFamily:'serif',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Our Additional Services
          </Typography>
          <Grid container spacing={4}>
            {[{
              icon: <AddShoppingCart />,
              title: 'Easy Checkout',
              description: 'Enjoy a seamless checkout experience with multiple payment options.'
            },
            {
              icon: <LocalShipping />,
              title: 'Free Shipping',
              description: 'We offer free shipping on all orders over a certain amount of pets all over world.'
            },
            {
              icon: <AccessTime />,
              title: '24/7 Support',
              description: 'Our customer support is available 24/7 to assist you with any inquiries.'
            },
            {
              icon: <Public />,
              title: 'Global Reach',
              description: 'We ship products globally to ensure everyone has access to our services.'
            }].map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 2,
                      borderRadius: '15px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#f9f9f9',
                    }}
                  >
                    <Box sx={{ fontSize: '2.5rem', color: '#007bff', mb: 2 }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2">
                      {service.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <FAQ />
      <Footer />
    </>
  );
};

export default Main;














