import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid, Button, Modal, Box, Paper } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Navbar from '../components/navbarPersonal';
import Footer from '../components/footer';
import ProductData from '../components/productdata'; // Adjust the path to where your ProductData is located
import { userProjectApi } from '../services/allAPI';
import { deleteProjectApi } from '../services/allAPI';
import { useEffect } from 'react';
import { BASE_URL } from '../services/baseURL';
import Swal from 'sweetalert2';
import Imagedonate from '../img/cats and dog.png'

function Donationlist() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (pet) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPet(null);
  };

  const [userProject, setUserProject] = useState([])
    const getUserProject = async()=>{
        const token = sessionStorage.getItem("token");
        const reqHeader ={
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await userProjectApi(reqHeader)
        console.log("==inside the project===");
        console.log(result.data);
        setUserProject(result.data)
    }
    useEffect(()=>{
        getUserProject();
    },[])

    const HandleDelete = async (id) => {
      handleClose(); // Close the modal first
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to delete this donation? This action cannot be undone.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        // Internal CSS for custom z-index
        customClass: {
          popup: 'custom-swal-popup'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = sessionStorage.getItem("token");
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          };
          const response = await deleteProjectApi(id, reqHeader);
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted Successfully!',
              showConfirmButton: false,
              timer: 1500
            });
    
            getUserProject();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Deletion Failed!',
              text: 'Something went wrong. Please try again later.'
            });
          }
        }
      });
    };
    
    // Inline styles using Material-UI's sx prop
    const customSwalStyles = `
      .custom-swal-popup {
        z-index: 2000 !important;
      }
    `;
    




  

  return (
    <div>
            <style>{customSwalStyles}</style>

      <Navbar />

      <Container
        sx={{ 
          minHeight: '70vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          textAlign: 'center', 
          padding: { xs: '1rem', sm: '2rem' }, // Responsive padding
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Donation List
        </Typography>

        <Grid container spacing={2}>
          {userProject.length === 0 ? (
            <Container
            sx={{ 
              minHeight: '70vh', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'center', 
              padding: '2rem'
            }}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                padding: '2rem', 
                borderRadius: '12px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center'
              }}
            >
              <img
                src={Imagedonate}
                alt="No Donations"
                style={{ width: 150, height: 150, marginBottom: '1rem', objectFit: 'cover', borderRadius: '8px' }}
              />
              <Typography 
                variant="h4" 
                color="textSecondary" 
                gutterBottom
                sx={{ mb: 2 }}
              >
                Your Donation List Is Empty
              </Typography>
              <Typography 
                variant="body1" 
                color="textSecondary"
                sx={{ mb: 3 }}
              >
                It looks like you haven't added any donations yet. Check back later or start adding your donations!
              </Typography>
            </Paper>
          </Container>
          ) : (
            userProject.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <Card sx={{ 
                  maxWidth: '100%', 
                  borderRadius: '12px', 
                  boxShadow: 3, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%'
                }}>
                  <CardMedia
                    component="img"
                    image= {`${BASE_URL}/uploads/${card.image}`} 
                    alt={card.petname}
                    sx={{ 
                      objectFit: 'cover',
                      height: { xs: 150, sm: 200 }, // Responsive image height
                      width: '100%',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, padding: { xs: '0.5rem', sm: '1rem' } }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {card.petname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Age: {card.age}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Breed: {card.breed}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Gender: {card.gender}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(card)}
                      sx={{ mt: 2, width: '100%' }}
                    >
                      Look On
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%' },
            maxWidth: 600,
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            overflowY: 'auto',
          }}>
            {selectedPet && (
              <>
                <Typography variant="h4" component="h2" gutterBottom>
                  {selectedPet.Title}
                </Typography>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" mb={2}>
                  <Box flex={1} mr={{ sm: 2 }} mb={{ xs: 2, sm: 0 }}>
                    <Typography variant="h6" gutterBottom>Pet Information</Typography>
                    <Typography><strong>Title:</strong> {selectedPet.petname}</Typography>
                    <Typography><strong>Breed:</strong> {selectedPet.breed}</Typography>
                    <Typography><strong>Age:</strong> {selectedPet.age}</Typography>
                    <Typography><strong>Gender:</strong> {selectedPet.gender}</Typography>
                    <Typography><strong>Vaccinated:</strong> {selectedPet.vaccinated}</Typography>
                    <Typography><strong>Spayed/Neutered:</strong> {selectedPet.spayed}</Typography>
                    <Typography><strong>Address:</strong> {selectedPet.address}</Typography>
                    <Typography><strong>Owner:</strong> {selectedPet.username}</Typography>
                    <Typography><strong>Phone:</strong> {selectedPet.phone}</Typography>
                    <Typography><strong>Additional Info:</strong> {selectedPet.additionalInfo}</Typography>
                  </Box>
                  <Box flex={1} ml={{ sm: 2 }}>
                    <img 
                      src= {`${BASE_URL}/uploads/${selectedPet.image}`} 
                      alt={selectedPet.Title} 
                      style={{ 
                        width: '100%', 
                        maxWidth: '100%', 
                        height: 'auto', 
                        borderRadius: '8px' 
                      }} 
                    />
                  </Box>
                </Box>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" mt={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={()=>HandleDelete(selectedPet._id)}
                    startIcon={<DeleteIcon />}
                    sx={{ flex: 1, mb: { xs: 1, sm: 0 } }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                    sx={{ flex: 1, ml: { sm: 2 } }}
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Container>

      <Footer />
    </div>
  );
}

export default Donationlist;












