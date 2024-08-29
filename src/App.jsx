import { Route, Routes } from "react-router-dom"; // No need to import Router
import Home from "./pages/home";
import Adoption from "./pages/adoption";
import Cart from "./pages/cart";
import Donate from "./pages/donate";
import Login from "./pages/login";
import Register from "./pages/register";
import Main from "./pages/main";
import { CartProvider } from './components/cartcontent';
import PersonalInfo from './pages/personalinfo';

import DonationList from "./pages/donationlist";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/personalinfo" element={<PersonalInfo />} />
        <Route path="/main" element={<Main />} />
        <Route path="/donationlist" element={<DonationList />} />
      </Routes>
    </CartProvider>
  );
}

export default App;




