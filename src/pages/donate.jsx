import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { addDonateAPi } from '../services/allAPI';
import Navbar from '../components/navbarPersonal';
import Footer from '../components/footer';  

function Donate() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [projectDetails, setprojectDetails] = useState({
    petname: "",
    pettype: "",
    breed: "",
    vaccinated: "",
    gender: "",
    spayed: "",
    age: "",
    image: "",
    username: "",
    address: "",
    phone: "",
    additionalInfo: "",
    price: ""          
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { petname, pettype, breed, vaccinated, gender, spayed, age, image, username, address, phone, additionalInfo, price } = projectDetails;
    if (!petname || !pettype || !breed || !vaccinated || !gender || !spayed || !age || !image || !username || !address || !phone || !additionalInfo || !price) {
      Swal.fire({
        title: "Please fill the form completely!",
        icon: "error"
      });
    } else {
      const reqBody = new FormData();
      reqBody.append('petname', petname);
      reqBody.append('pettype', pettype);
      reqBody.append('breed', breed);
      reqBody.append('vaccinated', vaccinated);
      reqBody.append('gender', gender);
      reqBody.append('spayed', spayed);
      reqBody.append('age', age);
      reqBody.append('image', image);
      reqBody.append('username', username);
      reqBody.append('address', address);
      reqBody.append('phone', phone);
      reqBody.append('additionalInfo', additionalInfo);
      reqBody.append('price', price);                   
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };

      const result = await addDonateAPi(reqBody, reqHeader);
      if (result.status === 200) {
        Swal.fire({
          title: "Your form has been successfully submitted",
          icon: "success"
        });
        handleReset();
        navigate('/adoption');
      } else {
        Swal.fire({
          title: (result.response.data),
          icon: "error"
        });
      }
    }
  };

  const handleReset = () => {
    setprojectDetails({
      petname: "",
      pettype: "",
      breed: "",
      vaccinated: "",
      gender: "",
      spayed: "",
      age: "",
      image: "",
      username: "",
      address: "",
      phone: "",
      additionalInfo: "",
      price: ""
    });
    setImagePreview(null); // Reset the image preview
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setprojectDetails({ ...projectDetails, image: file });
    setImagePreview(URL.createObjectURL(file)); // Generate image preview URL
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4, p: 4, backgroundColor: "#fff", borderRadius: 2, boxShadow: 0, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexDirection: 'column' }}>
          <FontAwesomeIcon icon={faPaw} size="3x" style={{ color: '#000', marginBottom: '8px' }} />
          <Typography variant="h4" align="center" color="textPrimary">
            Donation Form
          </Typography>
          <Divider sx={{ my: 2, width: '50%', borderColor: '#000' }} />
        </Box>
        <form>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }} color="#030B69">Pet Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pet Name"
                fullWidth
                variant="outlined"
                value={projectDetails.petname}
                onChange={(e) => setprojectDetails({ ...projectDetails, petname: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Pet Type</InputLabel>
                <Select
                  value={projectDetails.pettype}
                  onChange={(e) => setprojectDetails({ ...projectDetails, pettype: e.target.value })}
                  label="Pet Type"
                >
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Bird">Bird</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Breed"
                fullWidth
                variant="outlined"
                value={projectDetails.breed}
                onChange={(e) => setprojectDetails({ ...projectDetails, breed: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                <RadioGroup
                  row
                  value={projectDetails.vaccinated}
                  onChange={(e) => setprojectDetails({ ...projectDetails, vaccinated: e.target.value })}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Vaccinated" />
                  <FormControlLabel value="No" control={<Radio />} label="Not Vaccinated" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                <RadioGroup
                  row
                  value={projectDetails.gender}
                  onChange={(e) => setprojectDetails({ ...projectDetails, gender: e.target.value })}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                <RadioGroup
                  row
                  value={projectDetails.spayed}
                  onChange={(e) => setprojectDetails({ ...projectDetails, spayed: e.target.value })}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Spayed/Neutered" />
                  <FormControlLabel value="No" control={<Radio />} label="Not Spayed/Neutered" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Age</InputLabel>
                <Select
                  value={projectDetails.age}
                  onChange={(e) => setprojectDetails({ ...projectDetails, age: e.target.value })}
                  label="Age"
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="young">Young</MenuItem>
                  <MenuItem value="adult">Adult</MenuItem>
                  <MenuItem value="senior">Senior</MenuItem>
                  <MenuItem value="geriatric">Geriatric</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Additional Information"
                fullWidth
                variant="outlined"
                value={projectDetails.additionalInfo}
                onChange={(e) => setprojectDetails({ ...projectDetails, additionalInfo: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                fullWidth
                variant="outlined"
                value={projectDetails.price}
                onChange={(e) => setprojectDetails({ ...projectDetails, price: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <Button
              variant="contained"
              component="label"
              color="primary"
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Pet Preview"
                style={{
                  marginTop: "16px",
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
                }}
              />
            )}
          </FormControl>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" sx={{ mt: 2, mb: 2 }} color="#030B69">Your Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Name"
                fullWidth
                variant="outlined"
                value={projectDetails.username}
                onChange={(e) => setprojectDetails({ ...projectDetails, username: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                fullWidth
                variant="outlined"
                value={projectDetails.address}
                onChange={(e) => setprojectDetails({ ...projectDetails, address: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                fullWidth
                variant="outlined"
                value={projectDetails.phone}
                onChange={(e) => setprojectDetails({ ...projectDetails, phone: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ ml: 2 }}>
              Reset
            </Button>
          </Box>
        </form>
      </Container>
      <Footer />
    </>
  );
}

export default Donate;
