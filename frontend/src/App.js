
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import PlaceOrder from './Pages/PlaceOrder';
import Orders from './Pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Searchbar from './components/Searchbar';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Verify from './Pages/Verify';
import Myprofile from './Pages/MyProfile';
// import AddressCard from './components/AddressCard';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Searchbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path="/my-profile" element={<Myprofile />} />
        {/* <Route path='/address-card' element={<AddressCard />}/> */}
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/verify' element={<Verify/>}/>
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
