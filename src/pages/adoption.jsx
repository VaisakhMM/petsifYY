import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AiFillCloseCircle } from "react-icons/ai";
import '../components/cards.css';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { CartContext } from '../components/cartcontent'; // Ensure the path is correct
import { MainProjectApi } from '../services/allAPI';
import { useEffect } from "react";
import { BASE_URL } from "../services/baseURL";

const Adoption = () => {
  const [detail, setDetail] = useState(null); // Set initial state to null
  const [close, setClose] = useState(false);
  const { addToCart } = useContext(CartContext); // Get the addToCart function from context
  const [mainProject, setMainProject] = useState([]);

  const navigate = useNavigate(); // Initialize navigate

  const detailPage = (item) => {
    setDetail(item); // Set the selected item as the detail
    setClose(true);  // Show the detail view
  };

  const handleAdopt = (item) => {
    addToCart(item); // Add the item to the cart
    setClose(false); // Close the detail view
    navigate('/cart'); // Redirect to the Cart page
  };

  const getMainProject = async () => {
    const result = await MainProjectApi();
    setMainProject(result.data);
  };

  useEffect(() => {
    getMainProject();
  }, []);

  console.log("===Main Project====");
  console.log(mainProject);

  return (
    <>
      <Navbar/>
      <div className="container">
        {mainProject.map((curElm) => (
          <div className="box" key={curElm.id}>
            <div className="contant">
              <div className="img-box">
                <img src={`${BASE_URL}/uploads/${curElm.image}`} alt={curElm.Title} />
              </div>
              <div className="detail">
                <div className="info">
                  <h2>{curElm.petname}</h2>
                  <p>Age: {curElm.age}</p>
                  <p>Breed: {curElm.breed}</p>
                  <p>Gender: {curElm.gender}</p>
                  <p>Price: ₹{curElm.price}</p>
                </div>
                <button onClick={() => detailPage(curElm)}>LOOK ON</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {close && detail && (
        <div className="overlay">
          <div className="detail_container">
            <div className="detail_contant">
              <button className="close" onClick={() => setClose(false)}>
                <AiFillCloseCircle />
              </button>
              <div className="detail_info">
                <div className="img-box">
                  <img src={`${BASE_URL}/uploads/${detail.image}`} alt={detail.petname} />
                </div>
                <div className="product_detail" style={{textAlign:"start"}}>
                  <h2>{detail.petname}</h2>
                  <h4>Age: {detail.age}</h4>
                  <h4>Breed: {detail.breed}</h4>
                  <h4>Gender: {detail.gender}</h4>
                  <h4>Vaccinated: {detail.vaccinated}</h4>
                  <h4>Spayed/Neutered: {detail.spayed}</h4>
                  <h4>Additional Info: {detail.additionalInfo}</h4>
                  <h4>Place: {detail.address}</h4>
                  <h3>Price: ₹{detail.price}</h3>
                  <button onClick={() => handleAdopt(detail)}>Adopt</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default Adoption;


